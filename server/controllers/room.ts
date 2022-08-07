import { Request, Response } from 'express';
import socket from 'socket.io';

import ParticipantEntity from '../entities/participants';
import RoomEntity from '../entities/room';

class Room {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  //TODO join with createGroupChat
  async create(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      if (!userId) {
        return;
      }

      //TODO add transaction
      const room = await RoomEntity.create({ author: res.locals.user }).save();

      await ParticipantEntity.create({ room, userId }).save();
      await ParticipantEntity.create({ room, userId: res.locals.user }).save();

      return res.json({ message: 'success' });
      // this.io.emit('SERVER:DIALOG_CREATED', {
      //   ...postData,
      //   dialog: dialogObj,
      // });
    } catch (error) {}
  }

  async createGroupChat(req: Request, res: Response) {
    try {
      const { partner } = req.body;

      if (!partner) {
        return;
      }

      const room = RoomEntity.create({});
      await room.save();
    } catch (error) {}
  }

  async getMany(req: Request, res: Response) {
    try {
      console.log('res.locals.user11111', res.locals.user.id);

      const [rooms, count] = await RoomEntity.createQueryBuilder('room')
        .leftJoinAndSelect('room.participants', 'participants')
        .leftJoinAndSelect('room.participants.userId', 'user')
        .where('user.id = :id', { id: res.locals.user.id })
        .getManyAndCount();

      console.log('roomssss', rooms);
      return res.json({ rooms, count });
    } catch (error) {}
  }
}

export default Room;
