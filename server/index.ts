import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

// import createSocket from './socket';
import db from './db';
import createRoutes from './routes';

import registerChatHandlers from './socket';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 5050;

const start = async () => {
  try {
    await db
      .initialize()
      .then(() => console.log('Data Source has been initialized!'))
      .catch(err => console.error('Error during Data Source initialization:', err));

    const app = express();
    const http = createServer(app);
    const io = new Server(http, { cors: { origin: 'http://localhost:3000', credentials: true } });

    const onConnection = socket => {
      const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
      io.use(wrap(cookieParser()));

      console.log('User socket connected');
      registerChatHandlers(io, socket);
    };

    io.on('connection', onConnection);

    createRoutes(app);

    http.listen(PORT, () => console.log(`Server started on ${PORT} port`));
  } catch (error) {
    console.log('Something goes wrong:', error);
  }
};

start();
