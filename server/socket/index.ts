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
      users[me.id] = socket.id;
    }
    console.log('users', users);
    console.log('me', me);
    socket.on('ROOMS:TYPING', (obj: any) => {
      const { partner, ...rest } = obj;
      io.to(users[partner]).emit('ROOMS:TYPINGGGG', rest);
    });

    socket.on('ROOMS:CREATE', async (obj: any, callback) => {
      console.log('222');
      const { author, userId } = obj;
      const testRoom = await Room.createQueryBuilder('room')
        .leftJoinAndSelect('room.participants', 'participants')
        .where('room.type = :type', { type: 'private' })
        .andWhere('participants.userId = :id', { id: userId })
        .andWhere('participants.userId = :id', { id: me.id })
        .execute();

      console.log('testRoom', testRoom);

      if (testRoom) {
        // callback({ message: 'Room exist'})
      }

      const room = await Room.create({ author }).save();

      await Participant.create({ room, user: userId }).save();
      await Participant.create({ room, user: author }).save();

      const newRoom = await Room.findOne({
        where: { id: room.id },
        relations: ['participants', 'participants.user', 'lastMessage'],
      });
      callback({ roomId: room.id });

      const participants = newRoom.participants.map(({ user }) => {
        return user;
      });

      io.to([users[userId], users[author]]).emit('ROOMS:NEW_ROOM_CREATED', { ...newRoom, participants });
    });

    socket.on('ROOMS:SUBMIT', async ({ roomId, author, message, partner }: any) => {
      console.log('message', message);
      const { id } = await Message.create({ author, roomId, text: message }).save();

      const newMessage = await Message.findOne({
        where: { id },
        relations: ['author'],
      });

      await Room.createQueryBuilder('room')
        .update({ lastMessage: newMessage })
        .where({ id: roomId })
        .execute();
      console.log('users', users);
      console.log('author', author);
      console.log('socket.id', socket.id);

      io.to([users[partner], users[author]]).emit('ROOMS:NEW_MESSAGE_CREATED', newMessage);
    });

    socket.on('disconnect', () => {
      // delete users[me.id];
      console.log('Got disconnect!', users);
    });
  });

  return io;
};
