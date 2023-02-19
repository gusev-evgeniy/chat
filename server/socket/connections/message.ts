import { Server } from 'socket.io';
import Message from '../../entities/message';
import { EVENTS } from '../events';
import { GetTypingProps, MySocket } from '../types';
import { updateRoomLastMessage } from '../../utils/room';
import { readMessagesQuary } from '../../utils/message';

type Callback = (...arg: any) => void;

export default async (io: Server, socket: MySocket) => {
  const createMessage = async ({ roomId, message }: any) => {
    const { id } = await Message.create({
      author: socket.me,
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
    console.log('newMessage', newMessage)
    io.to(roomId).emit(EVENTS.MESSAGE.NEW_MESSAGE_CREATED, newMessage);
  };

  const getTyping = (obj: GetTypingProps) => {
    socket.broadcast.to(obj.roomId).emit(EVENTS.MESSAGE.RESPONSE_TYPING, obj);
  };

  const readMessage = async (
    { roomId }: { roomId: string },
    callback: Callback
  ) => {
    await readMessagesQuary( socket.me?.id, roomId)

    callback();
    socket.broadcast.to(roomId).emit(EVENTS.MESSAGE.READED, { roomId });
  };

  socket.on(EVENTS.MESSAGE.MESSAGE_CREATE, createMessage);
  socket.on(EVENTS.MESSAGE.TYPING, getTyping);
  socket.on(EVENTS.MESSAGE.READ, readMessage);
};
