import { Server } from 'socket.io';
import Message from '../entities/message';
import Participant from '../entities/participants';
import Room from '../entities/room';
import { EVENTS } from './events';
import { addMyDataToSocket } from '../utils/socket';
import { GetTypingProps } from './types';
import { getUserRooms, isPrivateRoomExist, updateLastMessage } from '../utils/queries/room';
import { updateUser } from '../utils/queries/user';

let users = {};

const chatHandler = async (io: Server, socket: any) => {
  await addMyDataToSocket(socket);

  if (socket.me) {
    users[socket.me.id] = socket.id;
    await updateUser(socket.me.id, { online: true });

    const [rooms, participants] = await getUserRooms(socket.me.id);
    socket.join(rooms);

    const socketIds = participants.map(id => users[id]);
    io.to(socketIds).emit(EVENTS.USER.ENTER, { userId: socket.me.id });
  }

  const createPrivateRoom = async (obj: any, callback: any) => {
    const { author, userId } = obj;
    const roomExist = await isPrivateRoomExist(userId, socket.me.id);

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
    callback({ id: room.id });

    const participants = newRoom.participants.map(({ user }) => user);

    io.to([users[userId], users[author]]).emit(EVENTS.ROOM.CREATED, { ...newRoom, participants, unreadedMessagesCount: 0 });
  };

  const createGroupRoom = async (obj: any, callback) => {
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

    const usersSocketId = usersId.map(id => users[id]);
    callback({ ...newRoom, participants });
    io.to(usersSocketId).emit(EVENTS.ROOM.CREATED, { ...newRoom, participants, unreadedMessagesCount: 0 });
  };

  const joinRoom = ({ roomId }) => {
    socket.join(roomId);
  };

  const createMessage = async ({ roomId, message }: any) => {
    const { id } = await Message.create({
      author: socket.me?.id,
      room: { id: roomId },
      text: message,
      roomId,
    }).save();

    const newMessage = await Message.findOne({
      where: { id },
      relations: ['author'],
    });

    await updateLastMessage(newMessage, roomId);

    io.to(roomId).emit(EVENTS.MESSAGE.NEW_MESSAGE_CREATED, newMessage);
  };

  const getTyping = (obj: GetTypingProps) => {
    socket.broadcast.to(obj.roomId).emit(EVENTS.MESSAGE.RESPONSE_TYPING, obj);
  };

  const readMessage = async ({ roomId }: { roomId: string }, callback) => {
    await Message.createQueryBuilder('message')
      .where('message."roomId" = :roomId', { roomId })
      .andWhere('message.readed IS FALSE')
      .andWhere('message."authorId" != :author', { author: socket.me?.id })
      .update({ readed: true })
      .execute();

      callback();
    socket.broadcast.to(roomId).emit(EVENTS.MESSAGE.READED, { roomId });
  };

  const disconnect = async () => {
    const wasOnline = new Date();

    if (socket.me?.id) {
      delete users[socket.me?.id];
      socket.broadcast.emit(EVENTS.USER.LEAVE, { userId: socket.me?.id, wasOnline });
      await updateUser(socket.me?.id, { online: false, wasOnline });
    }
  };

  socket.on(EVENTS.ROOM.CREATE_PRIVATE, createPrivateRoom);
  socket.on(EVENTS.ROOM.CREATE_GROUP, createGroupRoom);
  socket.on(EVENTS.ROOM.JOIN, joinRoom);

  socket.on(EVENTS.MESSAGE.MESSAGE_CREATE, createMessage);
  socket.on(EVENTS.MESSAGE.TYPING, getTyping);
  socket.on(EVENTS.MESSAGE.READ, readMessage);

  socket.on('disconnect', disconnect);
};

export default chatHandler;
