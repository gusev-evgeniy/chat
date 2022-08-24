import { Request, Response } from 'express';

import MessageEntity from '../entities/message';

class Message {
  async getMany(req: Request, res: Response) {
    try {
      const roomId = req.query.roomId as string;
      console.log('roomId', roomId)
      const [messages, count] = await MessageEntity.findAndCount({
        where: {
          roomId,
        },
        relations: ['author'],
        order: {
          createdAt: 'ASC',
        },
      });
      console.log('messages', messages)

      const extendedMessages = messages.map(message =>
        message.author.id === res.locals.user.id ? { ...message, isMy: true } : { ...message, isMy: false }
      );
      console.log('extendedMessages', extendedMessages)

      return res.json({ messages: extendedMessages, count });
    } catch (error) {}
  }
}

export default new Message();
