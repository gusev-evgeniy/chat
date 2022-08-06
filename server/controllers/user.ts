import { Request, Response } from 'express';
import cookie from 'cookie';

import UserEntity from '../entities/user';
import { createJWT } from '../utils/auth';

class User {
  async create(req: Request, res: Response) {
    try {
      const { password, name } = req.body || {};
      console.log('password, name', password, name);
      const url = req.protocol + '://' + req.get('host');
      console.log('url', url);
      const user = UserEntity.create({ name, password, photo: url + '/public/' + req.file?.filename });
      await user.save();

      const token = createJWT(user);
      res.set(
        'Set-Cookie',
        cookie.serialize('chatToken', token, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 1 week
        })
      );

      res.json(user);
    } catch (error: any) {
      console.log('error', error);
      res.status(500).json({ error: error.detail });
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
      console.log('user', user);
      if (user.length) {
        return res.status(401).json({ message: 'A user with the same name already exists' });
      }

      return res.json({ message: 'Success' });
    } catch (error) {
      console.log('error', error);
    }
  }

  async find(req: Request, res: Response) {
    const name = req.query.name;
    console.log('name', name)
    try {
      const [users, count] = await UserEntity.createQueryBuilder('user')
        .where('user.name like :name', { name:`%${name}%` })
        .andWhere('user.id != :id', { id: res.locals.user.id })
        .take(50)
        .getManyAndCount();

      res.json({ data: { users, count } });
    } catch (error) {}
  }
}

export default new User();
