import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import Auth from '../middleware/auth';
import Upload from '../middleware/multer';

import User from '../controllers/user';
import Room from '../controllers/room';
import Message from '../controllers/message';

const createRoutes = (app: express.Express) => {
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
      exposedHeaders: ['Content-Disposition'],
    })
  );
  app.use('/static', express.static('static'));
  app.use(express.json());
  app.use(cookieParser());

  app.post('/user/auth', Upload.single('photo'), User.create);
  app.post('/user/login', User.login);
  app.post('/user/logout', Auth, User.logout);
  app.get('/user/find', Auth, User.get);
  app.post('/user/check_name', User.checkName);
  app.get('/user/me', Auth, User.me);

  app.get('/room', Auth, Room.getMany);
  app.post('/room/update', Auth, Upload.single('photo'), Room.update);
  app.get('/room/checkPrivate', Auth, Room.checkPrivate);

  app.get('/message', Auth, Message.getMany);
  app.get('/attachment/:id', Auth, Message.download);
};

export default createRoutes;
