import { Server, Socket } from 'socket.io';

import User from '../../entities/user';
import { getOnlineParticipantsSocketId, getUserRooms } from '../../utils/room';
import { addMyDataToSocket } from '../../utils/socket';
import { updateUser } from '../../utils/user';
import { EVENTS } from '../events';

interface MySocket extends Socket {
  me?: User;
}

let timer: NodeJS.Timeout, prevUser: User | undefined;

export default async (io: Server, socket: MySocket) => {
  await addMyDataToSocket(socket);

  if (socket.me) {
    if (prevUser?.id === socket.me.id) {
      clearInterval(timer);
    }

    await updateUser(socket.me.id, { online: true, socketId: socket.id });

    const userRooms = await getUserRooms(socket.me.id);
    if (!userRooms) return;

    const [rooms, participantsSocketIds] = userRooms;
    console.log('participantsSocketIds', participantsSocketIds)
    socket.join(rooms);

    io.to(participantsSocketIds).emit(EVENTS.USER.ENTER, {
      userId: socket.me.id,
    });
  }

  const disconnect = async () => {
    console.log('disconnect');
    prevUser = socket.me;
    timer = setTimeout(async () => {
      const wasOnline = new Date();
      console.log('socket.me disconnect', socket.me?.id);
      if (socket.me?.id) {
        await updateUser(socket.me?.id, {
          online: false,
          wasOnline,
          //@ts-ignore
          socketId: null,
        });

        const participantsSocketIds = await getOnlineParticipantsSocketId(socket.me?.id);

        io.to(participantsSocketIds).emit(EVENTS.USER.LEAVE, {
          user: socket.me,
          wasOnline,
        });
      }
    }, 30000);
  };

  socket.on('disconnect', disconnect);
};
