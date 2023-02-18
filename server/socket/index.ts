import { Server } from 'socket.io';
import Message from '../entities/message';
import Participant from '../entities/participants';
import Room from '../entities/room';
import { EVENTS } from './events';
import { addMyDataToSocket } from '../utils/socket';
import { GetTypingProps } from './types';
import {
  addNewRoom,
  createSystemMessage,
  getUserRooms,
  isPrivateRoomExist,
  updateRoomLastMessage,
} from '../utils/room';
import { updateUser } from '../utils/user';
import User from '../entities/user';

type Callback = (...arg: any) => void;

const chatHandler = async (io: Server, socket: any) => {
  await addMyDataToSocket(socket);

  if (socket.me) {
    await updateUser(socket.me.id, { online: true, socketId: socket.id });

    const userRooms = await getUserRooms(socket.me.id);
    if (!userRooms) return;
    
    const [rooms, participantsSocketIds] = userRooms;
    socket.join(rooms);

    io.to(participantsSocketIds).emit(EVENTS.USER.ENTER, { userId: socket.me.id });
  }

  // const createPrivateRoom = async (participant: any, callback: Callback) => {
  //   const { id: userId, socketId } = participant;
  //   const author = socket.me.id;
  //   //TODO DOESN'T WORK
  //   const roomExist = await isPrivateRoomExist(userId, author);

  //   if (roomExist) {
  //     return callback({ message: 'Room exist' });
  //   }

  //   const room = await addNewRoom({ author }, participant)

  //   socket.join(room.id);
    
  //   const participants = room.participants.map(({ user }) => user);
    
  //   io.to([socketId, author]).emit(EVENTS.ROOM.CREATED, {
  //     ...room,
  //     participants,
  //     unreadedMessagesCount: 0,
  //   });

  //   callback({ id: room.id });
  // };

  const createRoom = async (obj: any, callback: Callback) => {
    const { users, title, type } = obj;

    const roomData: Partial<Room> = {
      author: socket.me, 
      type
    }

    if (title) roomData.title = title;
    console.log('roomData', roomData)
    const room = await addNewRoom({ data: roomData, authorName: socket.me.name, users })

    if (!room) {
      return;
    }

    socket.join(room.id);

    const participants = room.participants.map(({ user }) => user);

    const usersSocketId = users.map(({ socketId }) => socketId);
    callback({ ...room, participants });
    io.to(usersSocketId).emit(EVENTS.ROOM.CREATED, { ...room, participants, unreadedMessagesCount: 0 });
  };

  const joinRoom = ({ roomId }) => {
    socket.join(roomId);
  };

  const updateRoom = async ({ photo, title, id }) => {
    const roomInfo: Partial<Room> = {};

    if (title) roomInfo.title = title;

    const room = await Room.createQueryBuilder()
      .update(roomInfo)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const text = title ? `User ${socket.me.name} changed chat name to "${title}"` : '';
    const message = await createSystemMessage(text, id);

    io.to(id).emit(EVENTS.MESSAGE.NEW_MESSAGE_CREATED, message);
    io.to(id).emit(EVENTS.ROOM.UPDATED, room.raw[0]);
  };

  const leaveRoom = async ({ roomId }: { roomId: string }, callback: Callback) => {
    const participants = await Participant.delete({ room: { id: roomId }, user: { id: socket.me?.id } });
    socket.leave(roomId);

    const message = await createSystemMessage(`User ${socket.me.name} left the chat`, roomId);
    callback({ message: 'Success' });

    io.to(roomId).emit(EVENTS.MESSAGE.NEW_MESSAGE_CREATED, message);
    io.to(roomId).emit(EVENTS.ROOM.UPDATED, { participants });
  };

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

  const readMessage = async ({ roomId }: { roomId: string }, callback: Callback) => {
    await Message.createQueryBuilder('message')
      .where('message."roomId" = :roomId', { roomId })
      .andWhere('message.readed IS FALSE')
      .andWhere('message."authorId" != :author', { author: socket.me?.id })
      .update({ readed: true })
      .execute();

    callback();
    socket.broadcast.to(roomId).emit(EVENTS.MESSAGE.READED, { roomId });
  };

  // const acceptCall = ({ signal, to }) => {
  //   io.to(users[to]).emit(EVENTS.CALL.ACCEPTED, { signal });
  // };

  // const callUser = async ({ signal, to }, callback) => {
  //   callback();

  //   const me = await User.findOneBy({ id: socket.me.id });
  //   console.log('1111', me);
  //   io.to(users[to]).emit(EVENTS.CALL.GET, { signal, from: me });
  // };

  // const endCall = async ({ roomId }) => {
  //   const text = `User ${socket.me.name} end call`;
  //   const message = await createSystemMessage(text, roomId);

  //   io.to(roomId).emit(EVENTS.CALL.ENDED, { roomId, message });
  // };

  const disconnect = async () => {
    const wasOnline = new Date();

    if (socket.me?.id) {
      socket.broadcast.emit(EVENTS.USER.LEAVE, { userId: socket.me?.id, wasOnline });
      await updateUser(socket.me?.id, { online: false, wasOnline, socketId: undefined });
    }
  };

  socket.on(EVENTS.ROOM.CREATE, createRoom);
  socket.on(EVENTS.ROOM.JOIN, joinRoom);
  socket.on(EVENTS.ROOM.UPDATE, updateRoom);
  socket.on(EVENTS.ROOM.LEAVE, leaveRoom);

  socket.on(EVENTS.MESSAGE.MESSAGE_CREATE, createMessage);
  socket.on(EVENTS.MESSAGE.TYPING, getTyping);
  socket.on(EVENTS.MESSAGE.READ, readMessage);
  
  // socket.on(EVENTS.CALL.MADE, callUser);
  // socket.on(EVENTS.CALL.END, endCall);
  // socket.on(EVENTS.CALL.ACCEPT, acceptCall);

  socket.on('disconnect', disconnect);
};

export default chatHandler;
