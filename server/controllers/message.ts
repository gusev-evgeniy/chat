import { Request, Response } from 'express';

import MessageEntity from '../entities/message';

class Message {
  async getMany(req: Request, res: Response) {
    try {
      const roomId = req.query.roomId;
      const [messages, count] = await MessageEntity.findAndCount({
        where: {
          roomId: roomId as string,
        },
        relations: ['author'],
        order: {
          createdAt: 'ASC',
        },
      });
      return res.json({ messages, count });
    } catch (error) {}
  }
}

export default new Message();
