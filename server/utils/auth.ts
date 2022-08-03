import jwt from 'jsonwebtoken';

import UserEntity from '../entities/user';

export const createJWT = (user: UserEntity) => {
  const { id } = user;

  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret');
}

export const getDataFromJWT = (token: string): { id: string } | undefined => {
  if (!token) {
    return
  }
  
  return jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
}