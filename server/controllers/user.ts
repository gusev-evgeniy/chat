import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import cookie from 'cookie';

import UserEntity from '../entities/user';
import { createTokenAndAddCookie } from '../utils/auth';
import { getUsersByNameAndCount } from '../utils/queries/user';
import { prepareImage } from '../utils/prepareImage';
class User {
  async create(req: Request, res: Response) {
    try {
      const { password, name } = req.body || {};

      const userInfo: Partial<UserEntity> = {
        name,
        password,
      };
      console.log('req', req)
      console.log('host', req.host)
      const photoUrl = prepareImage(req);
      if (photoUrl) userInfo.photo = photoUrl;

      const user = UserEntity.create(userInfo) as UserEntity;
      await user.save();

      createTokenAndAddCookie(res, user);

      res.json(user);
    } catch (error: any) {
      console.log('error', error);
      res.json({ error: error.detail });
    }
  }

  async me(_: Request, res: Response) {
    return res.json(res.locals.user);
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
    try {
      const usersAndCount = await getUsersByNameAndCount(req.query.name as string, res.locals.user.id);

      res.json(usersAndCount);
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

  async logout(req: Request, res: Response) {
    console.log('eeeee');
    res.set(
      'Set-Cookie',
      cookie.serialize('chatToken', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0, // 1 week
      })
    );

    return res.json({ message: 'Success' });
  }
}

export default new User();
