import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import Message from '../entities/message';
import Participant from '../entities/participants';
import Room from '../entities/room';
import Auth from '../middleware/auth';
import jwt from 'jsonwebtoken';

export default (http: http.Server) => {
  const io = new Server(http, { cors: { origin: 'http://localhost:3000', credentials: true }, cookie: true });

  const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
  io.use(wrap(cookieParser()));

  // io.use((socket, next) => {
  //   console.log('0', socket.request.headers['cookie']);
  //   next();
  // });
  let me = {};

  const users = {};

  io.on('connection', function (socket: any) {
    const token = socket.request.cookies?.chatToken;
    if (token) {
      me = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    }

    console.log('connected1', socket.id);

    socket.on('ROOMS:TYPING', (obj: any) => {
      const { partner, ...rest } = obj;
      socket.to(users[partner]).emit('ROOMS:TYPING', rest);
    });

    socket.on('ROOMS:CREATE', async (obj: any) => {
      const { author, userId } = obj;
      console.log('CREATE', obj);

      const room = await Room.create({ author }).save();

      await Participant.create({ room, user: userId }).save();
      await Participant.create({ room, user: author }).save();
      socket.emit('ROOMS:CREATE', { ...obj, roomId: room.id });
    });

    socket.on('ROOMS:SUBMIT', async ({ roomId, author, message, partner }: any) => {
      const { id } = await Message.create({ author, roomId, text: message }).save();
      const newMessage = await Message.findOne({
        where: { id },
        relations: ['author'],
      });

      console.log('users', users);
      console.log('me', me);
      console.log('author', author);
      console.log('socket.id', socket.id);
      console.log('newMessage', newMessage);
      socket.emit('ROOMS:SUBMIT', newMessage);
    });

    socket.on('disconnect', () => {
      console.log('Got disconnect!', users);
    });
  });

  return io;
};
