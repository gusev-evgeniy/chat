import { Request, Response } from 'express';

import MessageEntity from '../entities/message';

class Message {
  async getMany(req: Request, res: Response) {
    try {
      const { roomId, skip = 0, take = 50 } = req.query;

      const [messages, count] = await MessageEntity.findAndCount({
        where: {
          roomId: roomId as string,
        },
        relations: ['author', 'attachment'],
        order: {
          createdAt: 'DESC',
        },
        skip: skip as number,
        take: take as number
      });

      const extendedMessages = messages.map(message =>
        message.authorId === res.locals.user.id ? { ...message, isMy: true } : { ...message, isMy: false }
      ).reverse();

      return res.json({ messages: extendedMessages, count });
    } catch (error) {}
  }
}

export default new Message();
