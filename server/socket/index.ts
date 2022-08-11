import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import Message from '../entities/message';
import Participant from '../entities/participants';
import Room from '../entities/room';
import Auth from '../middleware/auth';
import jwt from 'jsonwebtoken';
import { stringify } from 'querystring';

export default (http: http.Server) => {
  const io = new Server(http, { cors: { origin: 'http://localhost:3000', credentials: true }, cookie: true });

  const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
  io.use(wrap(cookieParser()));

  // io.use((socket, next) => {
  //   console.log('0', socket.request.headers['cookie']);
  //   next();
  // });
  let me: any = {};

  const users = {};

  io.on('connection', function (socket: any) {
    const token = socket.request.cookies?.chatToken;
    if (token) {
      me = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    }
    console.log('me', me);
    users[me.id] = socket.id;
    console.log('connected1', socket.id);

    socket.on('ROOMS:TYPING', (obj: any) => {
      const { partner, ...rest } = obj;
      io.to(users[partner]).emit('ROOMS:TYPINGGGG', rest);
    });

    socket.on('ROOMS:CREATE', async (obj: any, callback) => {
      const { author, userId } = obj;

      const room = await Room.create({ author }).save();

      await Participant.create({ room, user: userId }).save();
      await Participant.create({ room, user: author }).save();

      const newRoom = await Room.findOne({
        where: { id: room.id },
        relations: ['participants', 'participants.user'],
      });
      console.log('newRoom', newRoom);
      callback({ ...obj, roomId: room.id });

      socket.to(users[userId]).emit('ROOMS:NEW_ROOM_CREATED', { ...obj, roomId: room.id });
    });

    socket.on('ROOMS:SUBMIT', async ({ roomId, author, message, partner }: any, callback) => {
      console.log('message', message);
      const { id } = await Message.create({ author: me, roomId, text: message }).save();

      const newMessage = await Message.findOne({
        where: { id },
        relations: ['author'],
      });

      await Room.createQueryBuilder('room')
        .update({ lastMessage: newMessage })
        .where({ id: roomId })
        .execute();
      console.log('users[partner])', users[partner]);

      io.to(users[partner]).emit('ROOMS:NEW_MESSAGE_CREATED', newMessage);
      callback(newMessage);
    });

    socket.on('disconnect', () => {
      delete users[me.id];
      console.log('Got disconnect!', users);
    });
  });

  return io;
};
