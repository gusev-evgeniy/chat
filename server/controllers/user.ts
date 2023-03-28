import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import cookie from 'cookie';

import UserEntity from '../entities/user';

import { createTokenAndAddCookie } from '../utils/auth';
import { getOtherUsersByNameAndCount } from '../utils/user';
import { prepareImage } from '../utils/prepareImage';
class User {
  async create(req: Request, res: Response) {
    try {
      const { password, name, background } = req.body || {};

      if (!password || !name) {
        return res
          .status(400)
          .json({ message: 'Password and Name are required' });
      }

      const userInfo: Partial<UserEntity> = {
        name,
        password,
        background,
      };

      const photoUrl = prepareImage(req);
      if (photoUrl) userInfo.photo = photoUrl;

      const user = (await UserEntity.create(userInfo).save()) as UserEntity;

      createTokenAndAddCookie(res, user);

      const { password: userPassword, ...rest } = user;

      res.json(rest);
    } catch (error: any) {
      console.log('error', error);
      res.status(400).json({ error: error.detail });
    }
  }

  async me(_: Request, res: Response) {
    return res.json(res.locals.user);
  }

  async checkName(req: Request, res: Response) {
    try {
      const user = await UserEntity.find({
        where: { name: req.body.name.toLowerCase() },
      });

      if (user.length) {
        return res
          .status(401)
          .json({ message: 'A user with the same name already exists' });
      }

      return res.json({ message: 'Success' });
    } catch (error) {
      res.json({ error });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const usersAndCount = await getOtherUsersByNameAndCount(
        req.query.name as string,
        res.locals.user.id
      );

      res.json(usersAndCount);
    } catch (error) {
      res.json({ error });
    }
  }

  async login(req: Request, res: Response) {
    const { name, password } = req.body;
    try {
      const user = await UserEntity.findOne({
        where: { name: name.toLowerCase() as string },
        select: [
          'password',
          'id',
          'name',
          'online',
          'photo',
          'socketId',
          'wasOnline',
        ],
      });

      if (!user)
        return res.status(401).json({ message: 'Wrong password or name' });

      const isCorrectPassword = bcrypt.compareSync(
        password as string,
        user.password
      );

      if (!isCorrectPassword)
        res.status(401).json({ message: 'Wrong password or name' });

      createTokenAndAddCookie(res, user);

      const { password: _, ...rest } = user;

      res.json(rest);
    } catch (error) {
      res.status(401).json({ error });
    }
  }

  async logout(req: Request, res: Response) {
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
