import jwt from 'jsonwebtoken';
import { getUserRooms } from './queries/room';
import { updateUser } from './queries/user';

export const addMyDataToSocket = async (socket: any) => {
  const token = socket.request.cookies?.chatToken;
  if (!token) {
    return;
  }

  const me: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
  socket.me = me.id;

  await updateUser(socket.me, { online: true });

  const rooms = await getUserRooms(me.id);
  socket.join(rooms);
}