import { Server, Socket } from 'socket.io';
import User from '../../entities/user';
import { getUserRooms } from '../../utils/room';
import { addMyDataToSocket } from '../../utils/socket';
import { updateUser } from '../../utils/user';
import { EVENTS } from '../events';

interface MySocket extends Socket {
  me?: User;
}

export default async (io: Server, socket: MySocket) => {
  await addMyDataToSocket(socket);

  if (socket.me) {
    await updateUser(socket.me.id, { online: true, socketId: socket.id });

    const userRooms = await getUserRooms(socket.me.id);
    if (!userRooms) return;

    const [rooms, participantsSocketIds] = userRooms;
    socket.join(rooms);

    io.to(participantsSocketIds).emit(EVENTS.USER.ENTER, {
      userId: socket.me.id,
    });
  }

  const disconnect = async () => {
    const wasOnline = new Date();

    if (socket.me?.id) {
      socket.broadcast.emit(EVENTS.USER.LEAVE, {
        user: socket.me,
        wasOnline,
      });
      await updateUser(socket.me?.id, {
        online: false,
        wasOnline,
        socketId: undefined,
      });
    }
  };

  socket.on('disconnect', disconnect);
};
