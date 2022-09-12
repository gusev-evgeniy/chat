import { DataSource } from 'typeorm';

import User from './entities/user';
import Room from './entities/room';
import Message from './entities/message';
import Participant from './entities/participants';

const myDataSource = new DataSource({
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port:  +process.env.DB_PORT ||  5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME ||  'chat',
  entities: [User, Room, Message, Participant],
  logging: true,
  synchronize: true,
});

export default myDataSource;