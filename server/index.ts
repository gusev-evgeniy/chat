import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import db from './db';

const PORT = process.env.PORT || 5051;

const start = () => {
  try {
    db.initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch(err => {
        console.error('Error during Data Source initialization:', err);
      });

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
  } catch (error) {
    console.log('Something goes wrong');
  }
};

start();
