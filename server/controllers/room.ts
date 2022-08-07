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
}

export default Room;
