import { Request, Response } from 'express';

import { getRoomsAndCount, isPrivateRoomExist } from '../utils/queries/room';

class Room {
  async getMany(req: Request, res: Response) {
    try {
      const roomsAndCount = await getRoomsAndCount(res.locals.user.id);

      return res.json(roomsAndCount);
    } catch (error) {}
  }

  async checkPrivate(req: Request, res: Response) {
    try {
      const room = await isPrivateRoomExist(req.query.user as string, res.locals.user.id);

      return res.json(room);
    } catch (error) {
      
    }
  }
}

export default new Room();
