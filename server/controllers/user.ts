import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import socket from 'socket.io';

import UserEntity from '../entities/user';
import { createTokenAndAddCookie, createJWT } from '../utils/auth';

class User {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  async create(req: Request, res: Response) {
    try {
      const { password, name } = req.body || {};

      const url = req.protocol + '://' + req.get('host');

      const user = UserEntity.create({ name, password, photo: url + '/public/' + req.file?.filename });
      await user.save();

      createTokenAndAddCookie(res, user);

      res.json(user);
    } catch (error: any) {
      console.log('error', error);
      res.json({ error: error.detail });
    }
  }

  async me(_: Request, res: Response) {
    const me = res.locals.user;

    return res.json(me);
  }

  async checkName(req: Request, res: Response) {
    try {
      const user = await UserEntity.find({
        where: { name: req.body.name },
      });
      if (user.length) {
        return res.status(401).json({ message: 'A user with the same name already exists' });
      }

      return res.json({ message: 'Success' });
    } catch (error) {
      res.json({ error });
    }
  }

  async get(req: Request, res: Response) {
    const name = req.query.name;

    try {
      const [users, count] = await UserEntity.createQueryBuilder('user')
        .where('user.name like :name', { name: `%${name}%` })
        .andWhere('user.id != :id', { id: res.locals.user.id })
        .take(50)
        .getManyAndCount();

      res.json({ users, count });
    } catch (error) {
      res.json({ error });
    }
  }

  async getOne(req: Request, res: Response) {
    const { name, password } = req.query;
    try {
      const user = await UserEntity.findOne({
        where: { name: name as string },
      });

      if (!user) res.status(401).json({ message: 'Wrong password or name' });
      const isCorrectPassword = bcrypt.compareSync(password as string, user.password);

      if (!isCorrectPassword) res.status(401).json({ message: 'Wrong password or name' });

      createTokenAndAddCookie(res, user);
      
      const { password: _, ...rest } = user; 

      res.json({ user: rest });
    } catch (error) {
      res.status(401).json({ error });
    }
  }
}

export default User;
