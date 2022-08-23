import { Request, Response } from 'express';

import MessageEntity from '../entities/message';

class Message {
  async getMany(req: Request, res: Response) {
    try {
      const roomId = req.query.roomId as string;

      const [messages, count] = await MessageEntity.findAndCount({
        where: {
          roomId,
        },
        relations: ['author'],
        order: {
          createdAt: 'ASC',
        },
      });

      const test = await MessageEntity.createQueryBuilder('message')
        .select('message.*')
        // .addSelect(`("authorId" = 'b4c6eeb6-c61b-4599-b9b7-0b0f8d2f5070')`, 'test')
        .where('message."roomId" = :roomId', { roomId })
        .leftJoinAndSelect('message.author', 'author')
        .orderBy('message."createdAt"', 'ASC')
        .getRawMany();
      console.log('test11111111111111111111111111111', test);

      return res.json({ messages, count });
    } catch (error) {}
  }
}

export default new Message();
