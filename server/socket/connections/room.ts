import { Server } from 'socket.io';

import Participant from '../../entities/participants';
import Room from '../../entities/room';
import { findRoomAndCreateSystemMessage, uploadMedia } from '../../utils/message';
import { addNewRoom, prepareDataForNewRoom } from '../../utils/room';
import { EVENTS } from '../events';
import { Callback, MySocket, RoomData } from '../types';

type UpdateRoom = {
  title: string;
  id: string;
  photo: any;
};

export default async (io: Server, socket: MySocket) => {
  const createRoom = async (data: RoomData, callback: Callback) => {
    const roomData = prepareDataForNewRoom(data, socket);
    const room = await addNewRoom({
      data: roomData,
      authorName: socket.me.name,
      users: data.users,
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
    if (photo) roomInfo.photo = uploadMedia(photo, socket.handshake.headers.host);

    const room = await Room.createQueryBuilder()
      .update(roomInfo)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const text = title
      ? `User ${socket.me.name} changed chat name to "${title}"`
      : `User ${socket.me.name} changed chat photo`;
    const message = await findRoomAndCreateSystemMessage(text, id, roomInfo.photo);

    io.to(id).emit(EVENTS.MESSAGE.CREATED, message);
    io.to(id).emit(EVENTS.ROOM.UPDATED, room.raw[0]);
  };

  const leaveRoom = async ({ roomId }: { roomId: string }, callback: Callback) => {
    const participants = await Participant.delete({
      room: { id: roomId },
      user: { id: socket.me?.id },
    });
    socket.leave(roomId);

    const message = await findRoomAndCreateSystemMessage(`User ${socket.me.name} left the chat`, roomId);
    callback({ message: 'Success' });

    io.to(roomId).emit(EVENTS.MESSAGE.CREATED, message);
    io.to(roomId).emit(EVENTS.ROOM.UPDATED, { participants });
  };

  socket.on(EVENTS.ROOM.CREATE, createRoom);
  socket.on(EVENTS.ROOM.JOIN, joinRoom);
  socket.on(EVENTS.ROOM.UPDATE, updateRoom);
  socket.on(EVENTS.ROOM.LEAVE, leaveRoom);
};
