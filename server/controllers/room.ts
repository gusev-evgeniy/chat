import { Request, Response } from 'express';

import { getRoomsAndCount } from '../utils/queries/room';

class Room {
  async getMany(req: Request, res: Response) {
    try {
      const roomsAndCount = await getRoomsAndCount(res.locals.user.id);

      return res.json(roomsAndCount);
    } catch (error) {}
  }
}

export default new Room();
