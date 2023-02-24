import { Server } from 'socket.io';
import User from '../../entities/user';
import { createSystemMessage } from '../../utils/message';
import { EVENTS } from '../events';
import { MySocket } from '../types';

type CallProps = {
  to: string;
  signal: unknown;
};

export default async (io: Server, socket: MySocket) => {
  const callUser = async ({ signal, to }: CallProps) => {
    try {
      const { socketId } = await User.findOneByOrFail({
        id: to,
      });
      io.to(socketId).emit(EVENTS.CALL.GET, { signal, from: socket.me });
    } catch (error) {
      console.log('Call User Error: ', error);
    }
  };

  const answerCall = async ({ signal, to }: CallProps) => {
    try {
      const { socketId } = await User.findOneByOrFail({
        id: to,
      });

      io.to(socketId).emit(EVENTS.CALL.ACCEPTED, signal);
    } catch (error) {
      console.log('Anser Call Error: ', error);
    }
  };

  const endCall = async ({ to }: CallProps) => {
    const text = `User ${socket.me.name} end call`;
    // const message = await createSystemMessage(text, roomId);

    // io.to(participant as string).emit(EVENTS.CALL.ENDED, { roomId, message });
    io.to(to).emit(EVENTS.CALL.ENDED);
  };

  socket.on('callUser', callUser);
  socket.on('answerCall', answerCall);
  socket.on(EVENTS.CALL.END, endCall);
};
