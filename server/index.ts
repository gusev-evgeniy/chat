import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import db from './db';
import createRoutes from './routes';

import registerChatHandlers from './socket';
import cookieParser from 'cookie-parser';
import { MySocket } from './socket/types';


/* TODO
  транзакции
  логирование 
*/

const PORT = process.env.PORT || 5050;

const start = async () => {
  try {
    await db
      .initialize()
      .then(() => console.log('Data Source has been initialized!'))
      .catch(err =>
        console.error('Error during Data Source initialization:', err)
      );

    const app = express();
    const http = createServer(app);
    const io = new Server(http, {
      cors: { origin: 'http://localhost:3000', credentials: true },
      maxHttpBufferSize: 1e6
    });

    const onConnection = (socket: Socket) => {
      const wrap =
        (middleware: (...arg: any) => void) =>
        (socket: Socket, next: () => void) =>
          middleware(socket.request, {}, next);
      io.use(wrap(cookieParser()));

      console.log('User socket connected');
      registerChatHandlers(io, socket as MySocket);
    };

    io.on('connection', onConnection);

    createRoutes(app);

    http.listen(PORT, () => console.log(`Server started on ${PORT} port`));
  } catch (error) {
    console.log('Something goes wrong:', error);
  }
};

start();
