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

  app.get('/room', Auth, Room.getMany);

  app.get('/message', Message.getMany);
};

export default createRoutes;
