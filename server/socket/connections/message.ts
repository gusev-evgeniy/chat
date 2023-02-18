import { Server } from 'socket.io';
import Message from '../../entities/message';
import { EVENTS } from '../events';
import { GetTypingProps } from '../types';
import { updateRoomLastMessage } from '../../utils/room';

type Callback = (...arg: any) => void;

export default async (io: Server, socket: any) => {
  const createMessage = async ({ roomId, message }: any) => {
    const { id } = await Message.create({
      author: socket.me?.id,
      room: { id: roomId },
      text: message,
      roomId,
      authorId: socket.me?.id,
    }).save();

    const newMessage = await Message.findOne({
      where: { id },
      relations: ['author'],
    });

    await updateRoomLastMessage(newMessage as Message, roomId);

    io.to(roomId).emit(EVENTS.MESSAGE.NEW_MESSAGE_CREATED, newMessage);
  };

  const getTyping = (obj: GetTypingProps) => {
    socket.broadcast.to(obj.roomId).emit(EVENTS.MESSAGE.RESPONSE_TYPING, obj);
  };

  const readMessage = async (
    { roomId }: { roomId: string },
    callback: Callback
  ) => {
    await Message.createQueryBuilder('message')
      .where('message."roomId" = :roomId', { roomId })
      .andWhere('message.readed IS FALSE')
      .andWhere('message."authorId" != :author', { author: socket.me?.id })
      .update({ readed: true })
      .execute();

    callback();
    socket.broadcast.to(roomId).emit(EVENTS.MESSAGE.READED, { roomId });
  };

  socket.on(EVENTS.MESSAGE.MESSAGE_CREATE, createMessage);
  socket.on(EVENTS.MESSAGE.TYPING, getTyping);
  socket.on(EVENTS.MESSAGE.READ, readMessage);
};
