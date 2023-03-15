import jwt from 'jsonwebtoken';
import User from '../entities/user';

export const addMyDataToSocket = async (socket: any) => {
  const token = socket.request.cookies?.chatToken;
  if (!token) {
    return;
  }

  const me: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
  const user = await User.findOneBy({ id: me.id });
  socket.me = user;
}