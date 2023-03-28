import jwt from 'jsonwebtoken';
import User from '../entities/user';

export const addMyDataToSocket = async (socket: any) => {
  if (socket.me) {
    return;
  }
  const token = socket.request.cookies?.chatToken;
  console.log('_______________________2', socket.request.cookies)
  if (!token) {
    return;
  }

  const me: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
  const user = await User.findOneBy({ id: me.id });

  socket.me = user;
};
