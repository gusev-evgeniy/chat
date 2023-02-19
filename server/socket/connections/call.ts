import { Server } from 'socket.io';
import User from '../../entities/user';
import { createSystemMessage } from '../../utils/message';
import { EVENTS } from '../events';
import { MySocket } from '../types';

type CallProps = {
  to: string;
  signal: unknown;
}

let participant: string | undefined;

export default async (io: Server, socket: MySocket) => {
  const callUser = async ({ signal, to }: CallProps) => {
    console.log('to', to)
    participant = to;

    socket.to(to).emit(EVENTS.CALL.GET, { signal, from: socket.me });
  };

  const answerCall = ({ signal, to }: CallProps) => {
    console.log('tottt', to)
    console.log('socket', socket.me)
    io.to(to).emit('test', { signal });
  };

  const endCall = async () => {
    const text = `User ${socket.me.name} end call`;
    // const message = await createSystemMessage(text, roomId);

    // io.to(participant as string).emit(EVENTS.CALL.ENDED, { roomId, message });
    socket.to(participant as string).emit(EVENTS.CALL.ENDED);
    participant = undefined;
  };
    
  socket.on(EVENTS.CALL.CALL, callUser);
  socket.on(EVENTS.CALL.END, endCall);
  socket.on(EVENTS.CALL.ACCEPT, answerCall);
}