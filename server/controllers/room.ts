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

      await ParticipantEntity.create({ room, user: userId }).save();
      await ParticipantEntity.create({ room, user: res.locals.user }).save();

      return res.json({ message: 'success' });
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
      const [participants, count] = await ParticipantEntity.createQueryBuilder('participant')
        .where('participant.user = :id', { id: res.locals.user.id })
        .leftJoinAndSelect('participant.room', 'room')
        .leftJoinAndSelect('room.participants', 'participants')
        .leftJoinAndSelect('room.lastMessage', 'lastMessage')
        .leftJoinAndSelect('participants.user', 'user')
        .getManyAndCount();

      const rooms = participants.map(({ room }) => ({
        ...room,
        participants: room.participants.map(({ user }) => {
          return user;
        }),
      }));

      return res.json({ rooms, count });
    } catch (error) {}
  }
}

export default Room;
