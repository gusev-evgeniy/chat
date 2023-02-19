import { Server } from 'socket.io';

import roomConnection from './connections/room';
import messageConnection from './connections/message';
import callConnection from './connections/call';
import initConnection from './connections/init';
import { MySocket } from './types';

const chatHandler = async (io: Server, socket: MySocket) => {
  initConnection(io, socket)
  roomConnection(io, socket);
  messageConnection(io, socket);
  callConnection(io, socket);
};

export default chatHandler;
