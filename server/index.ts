import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import db from './db';
import routes from './routes';

const PORT = process.env.PORT || 5051;

const start = async () => {
  try {
    db.initialize()
      .then(() => console.log('Data Source has been initialized!'))
      .catch(err => console.error('Error during Data Source initialization:', err));

    const app = express();

    app.use('/public', express.static('public'));

    app.use(
      cors({
        credentials: true,
        origin: 'http://localhost:3000',
      })
    );

    app.use(express.json());
    app.use(cookieParser());
    app.use('/api', routes);

    app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
  } catch (error) {
    console.log('Something goes wrong');
  }
};

start();
