import { Request, Response } from 'express';
import cookie from 'cookie';

import UserEntity from '../entities/user';
import { createJWT } from '../utils/auth';

class User {
  async create(req: Request, res: Response) {
    try {
      const { photo, password, name } = req.body || {};

      const user = UserEntity.create({ name, password });
      await user.save();

      const token = createJWT(user);
      res.set(
        'Set-Cookie',
        cookie.serialize('token', token, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 1 week
        })
      );

      res.json({ message: 'success' });
    } catch (error: any) {
      console.log('error', error);
      res.status(500).json({ error: error.detail });
    }
  }

  async me(_: Request, res: Response) {
    const me = res.locals.user;

    return res.json(me);
  }
}

export default new User();
