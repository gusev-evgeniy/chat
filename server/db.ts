import { DataSource } from 'typeorm';

import User from './entities/user';
import Room from './entities/room';
import Message from './entities/message';
import Participant from './entities/participants';

const myDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'chat',
  entities: [User, Room, Message, Participant],
  logging: true,
  synchronize: true,
});

export default myDataSource;