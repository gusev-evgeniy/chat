import { Server } from 'socket.io';

import Message from '../../entities/message';
import { EVENTS } from '../events';
import { GetTypingProps, MySocket } from '../types';
import { updateRoomLastMessage } from '../../utils/room';
import { readMessagesQuary, uploadMedia } from '../../utils/message';
import Room from '../../entities/room';
import Attachment from '../../entities/attachment';

type Callback = (...arg: any) => void;
type Data = {
  message?: string;
  file?: File;
  media?: Buffer;
};
type File = {
  name: string;
  size: number;
  type: string;
  content: Buffer;
};

type NewMessage = {
  roomId: string;
  data: Data;
};

export default async (io: Server, socket: MySocket) => {
  const createMessage = async ({ roomId, data }: NewMessage) => {
    try {
      const { message, file, media } = data;
      if (!message && !file && !media) {
        return;
      }

      const room = await Room.findOneBy({ id: roomId });

      if (!room) {
        return;
      }

      const newMessageInfo: Partial<Message> = {
        author: socket.me,
        room,
        text: message,
        roomId,
        authorId: socket.me?.id,
      };

      if (media) {
        newMessageInfo.media = uploadMedia(media, socket.handshake.headers.host);
      }

      //add transaction
      if (file) {
        const attachment = await Attachment.create({
          ...file,
        }).save();
        newMessageInfo.attachment = attachment;
      }

      if (message) newMessageInfo.text = message;

      const { id } = (await Message.create(newMessageInfo).save()) as Message;

      //add transaction
      let newMessage = await Message.findOne({
        where: { id },
        relations: ['author', 'attachment'],
      });

      if (!newMessage) return;

      if (newMessage.attachment) {
        newMessage.attachment.content = {
          //@ts-ignore
          type: 'Buffer',
          data: [...new Uint8Array(newMessage.attachment.content)],
        };
      }
      await updateRoomLastMessage(newMessage, room);
      io.to(roomId).emit(EVENTS.MESSAGE.CREATED, newMessage);
    } catch (error) {
      console.log('Create message error:', error);
    }
  };

  const getTyping = (obj: GetTypingProps) => {
    socket.broadcast.to(obj.roomId).emit(EVENTS.MESSAGE.RESPONSE_TYPING, obj);
  };

  const readMessage = async ({ roomId }: { roomId: string }, callback: Callback) => {
    await readMessagesQuary(socket.me?.id, roomId);

    callback();
    socket.broadcast.to(roomId).emit(EVENTS.MESSAGE.READED, { roomId });
  };

  socket.on(EVENTS.MESSAGE.CREATE, createMessage);
  socket.on(EVENTS.MESSAGE.TYPING, getTyping);
  socket.on(EVENTS.MESSAGE.READ, readMessage);
};
