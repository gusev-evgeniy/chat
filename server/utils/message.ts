import { v4 as uuidv4 } from 'uuid';
import path from 'path';

import Message from '../entities/message';
import Room from '../entities/room';
import { updateRoomLastMessage } from './room';
import { writeFileSync } from 'fs';

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

export const uploadMedia = (media: Buffer, host = '') => {
  const filePath = '/static' + '/' + uuidv4();
  const mediaSrc = path.join(process.cwd() + filePath);
  writeFileSync(mediaSrc, media);
  

  return 'http://' + host + filePath;
}