import { Request, Response } from 'express';
import { prepareImage } from '../utils/prepareImage';

import RoomEntity from '../entities/room';

import { getRoomsAndCount, isPrivateRoomExist } from '../utils/room';

class Room {
  async getMany(_: Request, res: Response) {
    try {
      const roomsAndCount = await getRoomsAndCount(res.locals.user.id);

      return res.json(roomsAndCount);
    } catch (error) {
      console.log('error', error);
    }
  }

  async checkPrivate(req: Request, res: Response) {
    try {
      const room = await isPrivateRoomExist(req.query.user as string, res.locals.user.id);
      return res.json(room);
    } catch (error) {
      console.log('error', error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { title, id } = req.body;
      const photoUrl = prepareImage(req);

      const roomInfo: Partial<RoomEntity> = {};

      if (title) roomInfo.title = title;
      if (photoUrl) roomInfo.photo = photoUrl;

      const room = await RoomEntity.createQueryBuilder().update(roomInfo).where('id = :id', { id }).returning('*').execute();

      return res.json({ room: room.raw[0] });
    } catch (error) {
      console.log('error', error);
    }
  }
}

export default new Room();
