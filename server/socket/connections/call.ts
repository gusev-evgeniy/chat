import { Server } from 'socket.io';
import User from '../../entities/user';
import { findRoomAndCreateSystemMessage } from '../../utils/message';
import { EVENTS } from '../events';
import { MySocket } from '../types';

type CallProps = {
  to: string;
  signal: unknown;
  roomId: string;
};

export default async (io: Server, socket: MySocket) => {
  const callUser = async ({ signal, roomId }: CallProps) => {
    socket.broadcast.to(roomId).emit(EVENTS.CALL.GET, { signal, from: socket.me, roomId });
  };

  const answerCall = async ({ signal, to }: CallProps) => {
    try {
      const { socketId } = await User.findOneByOrFail({
        id: to,
      });

      io.to(socketId).emit(EVENTS.CALL.ACCEPTED, signal);
    } catch (error) {
      console.log('Answer Call Error: ', error);
    }
  };

  const endCall = async (roomId: string) => {
    const text = `User ${socket.me.name} end call`;
    const message = await findRoomAndCreateSystemMessage(text, roomId);

    io.to(roomId).emit(EVENTS.CALL.ENDED, message);
  };

  socket.on(EVENTS.CALL.CALL, callUser);
  socket.on('answerCall', answerCall);
  socket.on(EVENTS.CALL.END, endCall);
};
