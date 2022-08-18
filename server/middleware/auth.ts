import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserEntity from '../entities/user';

const Auth = async (req: Request, res: Response, next: () => void) => {
  try {
    const token = req.cookies.chatToken;
    console.log('token___________________', token)
    if (!token) return res.status(401).json({ message: 'Unauthenticated' });

    const { id }: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await UserEntity.findOneBy({ id });
    if (!user) return res.status(401).json({ message: 'Unauthenticated' });

    res.locals.user = user;
    next();
  } catch (error) {
    console.log('Auth error', error)
    return res.status(401).json({ message: 'Unauthenticated' });
  }
};

export default Auth;
