import { Server } from 'socket.io';
import { getUserRooms } from '../../utils/room';
import { addMyDataToSocket } from '../../utils/socket';
import { updateUser } from '../../utils/user';
import { EVENTS } from '../events';

export default async (io: Server, socket: any) => {
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
        userId: socket.me?.id,
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
