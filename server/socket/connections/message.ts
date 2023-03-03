import { Server } from 'socket.io';
import { writeFile } from 'fs';

import Message from '../../entities/message';
import { EVENTS } from '../events';
import { GetTypingProps, MySocket } from '../types';
import { updateRoomLastMessage } from '../../utils/room';
import { readMessagesQuary } from '../../utils/message';
import Room from '../../entities/room';
import Attachment from '../../entities/attachment';

type Callback = (...arg: any) => void;
type Data = {
  message?: string;
  file?: File;
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
      console.log('data', data);

      const { message, file } = data;

      if (!message && !file) {
        return;
      }

      const newMessageInfo: Partial<Message> = {
        author: socket.me,
        room: { id: roomId } as Room,
        text: message,
        roomId,
        authorId: socket.me?.id,
      };

      //add transaction
      if (file) {
        const attachment = await Attachment.create({
          ...file,
        }).save();
        newMessageInfo.attachment = attachment;
      }

      if (message) newMessageInfo.text = message;

      const { id } = (await Message.create(newMessageInfo).save()) as Message;

      const newMessage = await Message.findOne({
        where: { id },
        relations: ['author', 'attachment'],
      });

      await updateRoomLastMessage(newMessage as Message, roomId);
      console.log('newMessage', newMessage);
      io.to(roomId).emit(EVENTS.MESSAGE.NEW_MESSAGE_CREATED, newMessage);
    } catch (error) {
      console.log('Create message error:', error);
    }
  };

  const getTyping = (obj: GetTypingProps) => {
    socket.broadcast.to(obj.roomId).emit(EVENTS.MESSAGE.RESPONSE_TYPING, obj);
  };

  const readMessage = async (
    { roomId }: { roomId: string },
    callback: Callback
  ) => {
    await readMessagesQuary(socket.me?.id, roomId);

    callback();
    socket.broadcast.to(roomId).emit(EVENTS.MESSAGE.READED, { roomId });
  };

  socket.on(EVENTS.MESSAGE.MESSAGE_CREATE, createMessage);
  socket.on(EVENTS.MESSAGE.TYPING, getTyping);
  socket.on(EVENTS.MESSAGE.READ, readMessage);
};
