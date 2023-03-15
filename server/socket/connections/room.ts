import { Server } from 'socket.io';
import Participant from '../../entities/participants';
import Room from '../../entities/room';
import { createSystemMessage } from '../../utils/message';
import { addNewRoom } from '../../utils/room';
import { EVENTS } from '../events';
import { Callback, MySocket } from '../types';

export default async (io: Server, socket: MySocket) => {
  const createRoom = async (obj: any, callback: Callback) => {
    const { users, title, type } = obj;

    const roomData: Partial<Room> = {
      author: socket.me,
      type,
    };

    if (title) roomData.title = title;
    const room = await addNewRoom({
      data: roomData,
      authorName: socket.me.name,
      users,
    });

    if (!room) {
      return;
    }

    socket.join(room.id);

    const participants = room.participants.map(({ user }) => user);

    const usersSocketId = users.map(({ socketId }) => socketId);
    callback({ ...room, participants });

    socket.to(usersSocketId).emit(EVENTS.ROOM.CREATED, {
      ...room,
      participants,
      unreadedMessagesCount: 0,
    });
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

    const text = title
      ? `User ${socket.me.name} changed chat name to "${title}"`
      : '';
    const message = await createSystemMessage(text, id);

    io.to(id).emit(EVENTS.MESSAGE.NEW_MESSAGE_CREATED, message);
    io.to(id).emit(EVENTS.ROOM.UPDATED, room.raw[0]);
  };

  const leaveRoom = async (
    { roomId }: { roomId: string },
    callback: Callback
  ) => {
    const participants = await Participant.delete({
      room: { id: roomId },
      user: { id: socket.me?.id },
    });
    socket.leave(roomId);

    const message = await createSystemMessage(
      `User ${socket.me.name} left the chat`,
      roomId
    );
    callback({ message: 'Success' });

    io.to(roomId).emit(EVENTS.MESSAGE.NEW_MESSAGE_CREATED, message);
    io.to(roomId).emit(EVENTS.ROOM.UPDATED, { participants });
  };

  socket.on(EVENTS.ROOM.CREATE, createRoom);
  socket.on(EVENTS.ROOM.JOIN, joinRoom);
  socket.on(EVENTS.ROOM.UPDATE, updateRoom);
  socket.on(EVENTS.ROOM.LEAVE, leaveRoom);
};
