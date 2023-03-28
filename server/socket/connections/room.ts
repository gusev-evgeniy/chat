import { writeFileSync } from 'fs';
import path from 'path';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import Participant from '../../entities/participants';
import Room from '../../entities/room';
import { createSystemMessage } from '../../utils/message';
import { addNewRoom } from '../../utils/room';
import { EVENTS } from '../events';
import { Callback, MySocket } from '../types';
type UpdateRoom = {
  title: string;
  id: string;
  photo: any
}

export default async (io: Server, socket: MySocket) => {
  const createRoom = async (obj: any, callback: Callback) => {
    const { users, title, type, photo, background } = obj;
    const roomData: Partial<Room> = {
      author: socket.me,
      type,
    };

    if (background) roomData.background = background;

    if (photo) {
      const filePath = '/static' + '/' + uuidv4();
      const mediaSrc = path.join(process.cwd() + filePath);
      writeFileSync(mediaSrc, photo);
      roomData.photo ='http://' + socket.handshake.headers.host + filePath;
    }

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
    const usersSocketId = participants.map(({ socketId }) => socketId);

    callback({ ...room, participants, unreadedMessagesCount: 0 });

    socket.to(usersSocketId).emit(EVENTS.ROOM.CREATED, {
      ...room,
      participants,
      unreadedMessagesCount: 0,
    });
  };

  const joinRoom = ({ roomId }: { roomId: string }) => {
    socket.join(roomId);
  };

  const updateRoom = async ({ title, id, photo }: UpdateRoom) => {
    const roomInfo: Partial<Room> = {};

    if (title) roomInfo.title = title;

    if (photo) {
      const filePath = '/static' + '/' + uuidv4();
      const mediaSrc = path.join(process.cwd() + filePath);
      writeFileSync(mediaSrc, photo);
      roomInfo.photo ='http://' + socket.handshake.headers.host + filePath;
    }

    const room = await Room.createQueryBuilder()
      .update(roomInfo)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const text = title
      ? `User ${socket.me.name} changed chat name to "${title}"`
      : `User ${socket.me.name} changed chat photo`;
    const message = await createSystemMessage(text, id, roomInfo.photo);

    io.to(id).emit(EVENTS.MESSAGE.CREATED, message);
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

    io.to(roomId).emit(EVENTS.MESSAGE.CREATED, message);
    io.to(roomId).emit(EVENTS.ROOM.UPDATED, { participants });
  };

  socket.on(EVENTS.ROOM.CREATE, createRoom);
  socket.on(EVENTS.ROOM.JOIN, joinRoom);
  socket.on(EVENTS.ROOM.UPDATE, updateRoom);
  socket.on(EVENTS.ROOM.LEAVE, leaveRoom);
};
