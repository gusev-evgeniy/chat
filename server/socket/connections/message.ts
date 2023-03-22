import { Server } from 'socket.io';
import { writeFileSync } from 'fs';

import Message from '../../entities/message';
import { EVENTS } from '../events';
import { GetTypingProps, MySocket } from '../types';
import { updateRoomLastMessage } from '../../utils/room';
import { readMessagesQuary } from '../../utils/message';
import Room from '../../entities/room';
import Attachment from '../../entities/attachment';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

type Callback = (...arg: any) => void;
type Data = {
  message?: string;
  file?: File;
  media?: Buffer;
  serialNum: number;
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

const BASE_URL = 'http://localhost:5050';

export default async (io: Server, socket: MySocket) => {
  const createMessage = async ({ roomId, data }: NewMessage) => {
    try {
      const { message, file, media, serialNum } = data;

      if (!message && !file && !media) {
        return;
      }

      const newMessageInfo: Partial<Message> = {
        author: socket.me,
        room: { id: roomId } as Room,
        text: message,
        roomId,
        authorId: socket.me?.id,
        serialNum
      };

      if (media) {
        const filePath = '/static' + '/' + uuidv4();
        const mediaSrc = path.join(process.cwd() + filePath)
        writeFileSync(mediaSrc, media);
        newMessageInfo.media = BASE_URL + filePath;
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
      const newMessage = await Message.findOne({
        where: { id },
        relations: ['author', 'attachment'],
      });

      await updateRoomLastMessage(newMessage as Message, roomId);
      io.to(roomId).emit(EVENTS.MESSAGE.CREATED, newMessage);
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
 
  socket.on(EVENTS.MESSAGE.CREATE, createMessage);
  socket.on(EVENTS.MESSAGE.TYPING, getTyping);
  socket.on(EVENTS.MESSAGE.READ, readMessage);
};
