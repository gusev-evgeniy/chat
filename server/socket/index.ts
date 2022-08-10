import http from 'http';
import { Server } from 'socket.io';
import Message from '../entities/message';
import Participant from '../entities/participants';
import Room from '../entities/room';

export default (http: http.Server) => {
  const io = new Server(http, { cors: { origin: '*' }, cookie: true });

  
  // io.use((socket, next) => {

  //   console.log(' socket.handshake',  socket.handshake)
  //   // const sessionID = socket.handshake.auth.sessionID;
  //   // if (sessionID) {
  //   //   // find existing session
  //   //   const session = sessionStore.findSession(sessionID);
  //   //   if (session) {
  //   //     socket.sessionID = sessionID;
  //   //     socket.userID = session.userID;
  //   //     socket.username = session.username;
  //   //     return next();
  //   //   }
  //   // }
  //   // const username = socket.handshake.auth.username;
  //   // if (!username) {
  //   //   return next(new Error("invalid username"));
  //   // }
  //   // // create new session
  //   // socket.sessionID = randomId();
  //   // socket.userID = randomId();
  //   // socket.username = username;
  //   next();
  // });

  const users = {};

  io.on('connection', function (socket: any) {
    console.log('connected', socket.socketId);
    console.log('connected1', socket.id);

    // users[user.id] = socket

    socket.on('ROOMS:JOIN', (dialogId: string) => {
      socket.dialogId = dialogId;
      console.log('socket.dialogId', dialogId);
      socket.join(dialogId);
    });

    socket.on('ROOMS:TYPING', ({ user, dialogId }: any) => {
      console.log('typing222', obj);
      socket.broadcast.emit('ROOMS:TYPING', obj);
    });

    socket.on('ROOMS:CREATE', async (obj: any) => {
      const { author, userId } = obj;
      console.log('CREATE', obj);

      const room = await Room.create({ author }).save();

      await Participant.create({ room, user: userId }).save();
      await Participant.create({ room, user: author }).save();
      socket.emit('ROOMS:CREATE', { ...obj, roomId: room.id }); //TODO temp
    });

    socket.on('ROOMS:SUBMIT', async (obj: any) => {
      console.log('SUBMIT', obj);

      // Message.create({  })
      socket.emit('ROOMS:SUBMIT', { message: 'test' }); //TODO temp
    });
  });

  return io;
};
