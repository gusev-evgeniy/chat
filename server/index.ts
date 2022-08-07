import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import { createServer } from 'http';

import createSocket from './socket';
import db from './db';
import createRoutes from './routes';

const PORT = process.env.PORT || 5050;

const start = async () => {
  try {
    db.initialize()
      .then(() => console.log('Data Source has been initialized!'))
      .catch(err => console.error('Error during Data Source initialization:', err));

    const app = express();
    const http = createServer(app);
    const io = createSocket(http);

    createRoutes(app, io);

    app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
  } catch (error) {
    console.log('Something goes wrong');
  }
};

start();
