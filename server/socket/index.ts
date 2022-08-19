import { Server } from 'socket.io';
import Message from '../entities/message';
import Participant from '../entities/participants';
import Room from '../entities/room';
import { EVENTS } from './events';
import { addMyDataToSocket } from '../utils/socket';
import { GetTypingProps } from './types';
import { isPrivateRoomExist, updateLastMessage } from '../utils/queries/room';
import { updateUser } from '../utils/queries/user';

const chatHandler = async (io: Server, socket: any) => {
  await addMyDataToSocket(socket);
  socket.broadcast.emit(EVENTS.USER.ENTER, { userId: socket.me });
  
  const createPrivateRoom = async (obj: any, callback: any) => {
    console.log('createPrivateRoom', obj);
    const { author, userId } = obj;

    const roomExist = await isPrivateRoomExist(userId, socket.me);
    if (roomExist) {
      return callback({ message: 'Room exist' });
    }

    const room = await Room.create({ author }).save();

    await Participant.create({ room, user: userId }).save();
    await Participant.create({ room, user: author }).save();

    const newRoom = await Room.findOne({
      where: { id: room.id },
      relations: ['participants', 'participants.user'],
    });

    socket.join(room.id);
    callback({ roomId: room.id });

    const participants = newRoom.participants.map(({ user }) => {
      return user;
    });

    io.to(room.id).emit(EVENTS.ROOM.CREATED, { ...newRoom, participants });
  };

  const createGroupRoom = async (obj: any) => {
    console.log('createGroupRoom', obj);
    const { author, usersId, title, type } = obj;

    const room = await Room.create({ author, title, type }).save();
    await Participant.create({ room, user: author }).save();

    for (let userId of usersId) {
      await Participant.create({ room, user: userId }).save();
    }

    const newRoom = await Room.findOne({
      where: { id: room.id },
      relations: ['participants', 'participants.user'],
    });

    socket.join(room.id);

    const participants = newRoom.participants.map(({ user }) => {
      return user;
    });

    io.to(room.id).emit(EVENTS.ROOM.CREATED, { ...newRoom, participants });
  };

  const joinRoom = ({ roomId }) => {
    socket.join(roomId);
  };

  const createMessage = async ({ roomId, author, message, partner, type }: any) => {
    const { id } = await Message.create({ author, roomId, text: message }).save();

    const newMessage = await Message.findOne({
      where: { id },
      relations: ['author'],
    });

    await updateLastMessage(newMessage, roomId);

    io.to(roomId).emit(EVENTS.MESSAGE.NEW_MESSAGE_CREATED, newMessage);
  };

  const getTyping = ({ partner, ...rest }: GetTypingProps) => {
    socket.broadcast.to(rest.roomId).emit(EVENTS.MESSAGE.RESPONSE_TYPING, rest);
  };

  const disconnect = async () => {
    const wasOnline = new Date();

    socket.broadcast.emit(EVENTS.USER.LEAVE, { userId: socket.me, wasOnline });
    await updateUser(socket.me, { online: false, wasOnline });
  };

  socket.on(EVENTS.ROOM.CREATE_PRIVATE, createPrivateRoom);
  socket.on(EVENTS.ROOM.CREATE_GROUP, createGroupRoom);
  socket.on(EVENTS.ROOM.JOIN, joinRoom);

  socket.on(EVENTS.MESSAGE.MESSAGE_CREATE, createMessage);
  socket.on(EVENTS.MESSAGE.TYPING, getTyping);
  socket.on('disconnect', disconnect);
};

export default chatHandler;
