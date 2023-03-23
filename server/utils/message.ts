import Message from '../entities/message';
import Room from '../entities/room';

export const createSystemMessage = async (text: string, roomId: string, media?: string ) => {
  return await Message.create({
    text,
    room: { id: roomId },
    roomId,
    isSystem: true,
    readed: true,
    media,
  }).save();
};

export const readMessagesQuary = async (author: string, roomId: string) => {
  await Message.createQueryBuilder('message')
    .where('message."roomId" = :roomId', { roomId })
    .andWhere('message.readed IS FALSE')
    .andWhere('message."authorId" != :author', { author })
    .update({ readed: true })
    .execute();
};
