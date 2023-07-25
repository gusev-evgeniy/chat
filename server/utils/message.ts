import Message from '../entities/message';
import Room from '../entities/room';
import { updateRoomLastMessage } from './room';

export const createSystemMessage = async (
  text: string,
  room: Room,
  media?: string
) => {
  const message = await Message.create({
    text,
    room,
    roomId: room.id,
    isSystem: true,
    readed: true,
    media,
  }).save();

  await updateRoomLastMessage(message, room);

  return message;
};

export const findRoomAndCreateSystemMessage = async (
  text: string,
  roomId: string,
  media?: string
) => {
  const room = await Room.findOneBy({ id: roomId });
  if (room) {
    return await createSystemMessage(text, room, media);
  }
};

export const readMessagesQuary = async (author: string, roomId: string) => {
  await Message.createQueryBuilder('message')
    .where('message."roomId" = :roomId', { roomId })
    .andWhere('message.readed IS FALSE')
    .andWhere('message."authorId" != :author', { author })
    .update({ readed: true })
    .execute();
};
