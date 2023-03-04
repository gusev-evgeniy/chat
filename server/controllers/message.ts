import { Request, Response } from 'express';
import Attachment from '../entities/attachment';
import stream from 'stream'
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

  async download(req: Request, res: Response) {
    try {

      // const fileData = 'SGVsbG8sIFdvcmxkIQ=='
      // const fileName = 'hello_world.txt'
      // const fileType = 'text/plain'
    
      // var fileContents = Buffer.from(fileData, "base64");
  
      // var readStream = new stream.PassThrough();
      // readStream.end(fileContents);
    
      // res.set('Content-disposition', 'attachment; filename=' + fileName);
      // res.set('Content-Type', fileType);
    
      // readStream.pipe(res);

      const attach = await Attachment.findOneBy({ id: req.params.id });
      if (!attach) return;
      console.log(`attach :>>`, attach);
      res.set({
          'Content-Disposition': `attachment; filename=${encodeURIComponent(attach.name)}`,
          'Content-Type': attach.type, 
          'Content-Length': attach.size
      });

      return res.send(attach.content);

    } catch (error) {
      
    }
  }
}

export default new Message();
