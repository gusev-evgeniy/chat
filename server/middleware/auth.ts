import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserEntity from '../entities/user';

const Auth = async (req: Request, res: Response, next: () => void) => {
  try {
    console.log('_________________________________________')
    const token = req.cookies.token;
    if (!token) throw { message: 'Unauthenticated' };

    const { id }: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await UserEntity.findOneBy({ id });

    if (!user) throw { message: 'Unauthenticated' };

    res.locals.user = user;
    next();
  } catch (error) {
    console.log('Auth error', error)
    return res.json({ message: 'Unauthenticated' });
  }
};

export default Auth;
