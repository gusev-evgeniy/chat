import Message from '../../entities/message';
import Participant from '../../entities/participants';
import Room from '../../entities/room';

export const isPrivateRoomExist = async (userId: string, myId: string) => {
  try {
    const room = await Room.createQueryBuilder('room')
      .leftJoinAndSelect('room.participants', 'participants')
      .where('room.type = :type', { type: 'private' })
      .andWhere('participants.userId IN (:...ids)', { ids: [userId, myId] })
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
      .leftJoinAndSelect('room.participants', 'participants')
      .leftJoinAndSelect('participants.user', 'user')
      .getMany();

    const roomsAndUsers = participants.reduce(
      (acc, { room }) => {
        acc[0].push(room.id);

        const users = room.participants.map(({ user }) => user.id);
        acc[1] = [...acc[1], ...new Set(users)];

        return acc;
      },
      [[], []]
    );

    return roomsAndUsers;
  } catch (error) {}
};

export const getRoomsAndCount = async (id: string) => {
  const [participants, count] = await Participant.createQueryBuilder('participant')
    .where('participant.user = :id', { id })
    .leftJoinAndSelect('participant.room', 'room')
    .leftJoinAndSelect('room.participants', 'participants')
    .leftJoinAndSelect('room.lastMessage', 'lastMessage')
    .leftJoinAndSelect('participants.user', 'user')
    .loadRelationCountAndMap('room.unreadedMessagesCount', 'room.messages', 'message', qb =>
      qb.where('message.readed IS FALSE').andWhere('message."authorId" != :author', { author: id })
    )
    .addOrderBy('room.updatedAt', 'DESC')
    .getManyAndCount();

  const rooms = participants.map(({ room }) => ({
    ...room,
    participants: room.participants.map(({ user }) => {
      return user;
    }),
  }));

  return { rooms, count };
};
