import { DataSource } from 'typeorm';
import User from './entities/user';

const myDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'chat',
  entities: [User],
  logging: true,
  synchronize: true,
});

export default myDataSource;