import http from 'http';
import { Server } from 'socket.io';

export default (http: http.Server) => {
  const io = new Server(http, { cors: { origin: '*' } });

  io.on('connection', function (socket: any) {
    console.log('connected');

    socket.on('ROOMS:JOIN', (dialogId: string) => {
      socket.dialogId = dialogId;
      console.log('socket.dialogId', dialogId)
      socket.join(dialogId);
    });
    socket.on('ROOMS:TYPING', (obj: any) => {
      console.log('typing222')
      socket.broadcast.emit('ROOMS:TYPING', obj);
    });
  });

  return io;
};
