import jwt from 'jsonwebtoken';
import { updateUser } from './user';

export const addMyDataToSocket = async (socket: any) => {
  const token = socket.request.cookies?.chatToken;
  if (!token) {
    return;
  }

  const me: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
  socket.me = me;
}