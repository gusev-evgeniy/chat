import express from 'express';
import socket from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import Auth from '../middleware/auth';
import Upload from '../middleware/multer';

import UserController from '../controllers/user';
import RoomController from '../controllers/room';


const createRoutes = (app: express.Express, io: socket.Server) => {
  const User = new UserController(io);
  const Room = new RoomController(io);

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    })
  );
  app.use('/public', express.static('public'));
  app.use(express.json());
  app.use(cookieParser());

  app.post('/user/auth', Upload.single('photo'), User.create);
  app.get('/user/login', User.getOne);
  app.get('/user/find', Auth, User.get);
  app.post('/user/check_name', User.checkName);
  app.get('/user/me', Auth, User.me);

  app.post('/room/create', Auth, Room.create)
};

export default createRoutes;
