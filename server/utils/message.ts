import Message from '../entities/message';
import { updateRoomLastMessage } from './room';

export const createSystemMessage = async (text: string, roomId: string, media?: string ) => {
  const message = await Message.create({
    text,
    room: { id: roomId },
    roomId,
    isSystem: true,
    readed: true,
    media,
  }).save();

  await updateRoomLastMessage(message, roomId);
  return message;
};

export const readMessagesQuary = async (author: string, roomId: string) => {
  await Message.createQueryBuilder('message')
    .where('message."roomId" = :roomId', { roomId })
    .andWhere('message.readed IS FALSE')
    .andWhere('message."authorId" != :author', { author })
    .update({ readed: true })
    .execute();
};
