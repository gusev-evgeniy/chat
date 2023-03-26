import jwt from 'jsonwebtoken';
import User from '../entities/user';

export const addMyDataToSocket = async (socket: any) => {
  console.log('___-----------socket.me', socket.me)
  console.log('___-----------socket.id', socket.id)

  if (socket.me) {
    return;
  }

  const token = socket.request.cookies?.chatToken;
  console.log('____________________token', token)
  if (!token) {
    return;
  }

  const me: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
  const user = await User.findOneBy({ id: me.id });
  console.log('____________________user', user)
  socket.me = user;
}