import Message from '../../entities/message';
import Participant from '../../entities/participants';
import Room from '../../entities/room';

export const isPrivateRoomExist = async (userId: string, myId: string) => {
  try {
    const room = await Room.createQueryBuilder('room')
      .leftJoinAndSelect('room.participants', 'participants')
      .where('room.type = :type', { type: 'private' })
      .andWhere('participants.userId = :id', { id: userId })
      .andWhere('participants.userId = :id', { id: myId })
      .getOneOrFail();

    return room;
  } catch (error) {
    return undefined;
  }
};

export const updateLastMessage = async (lastMessage: Message, roomId: string) => {
  try {
    await Room.createQueryBuilder('room').update({ lastMessage }).where({ id: roomId }).execute();
  } catch (error) {}
};

export const getUserRooms = async (id: string) => {
  try {
    const participants = await Participant.createQueryBuilder('participant')
      .where('participant.user = :id', { id })
      .leftJoinAndSelect('participant.room', 'room')
      .getMany();

    return participants.map(({ room }) => room.id);
  } catch (error) {}
};

export const getRoomsAndCount = async (id: string) => {
  const [participants, count] = await Participant.createQueryBuilder('participant')
    .where('participant.user = :id', { id })
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

  return { rooms, count };
};
