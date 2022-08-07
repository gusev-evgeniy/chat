import { Response } from 'express';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import UserEntity from '../entities/user';

export const createJWT = (user: UserEntity) => {
  const { id } = user;

  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret');
};

export const getDataFromJWT = (token: string): { id: string } | undefined => {
  if (!token) {
    return;
  }

  return jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
};

export const createTokenAndAddCookie = (res: Response, user: UserEntity) => {
  const token = createJWT(user);

  return res.set(
    'Set-Cookie',
    cookie.serialize('chatToken', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
  );
};
