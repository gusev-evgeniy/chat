import Message from '../entities/message';
import Participant from '../entities/participants';
import Room from '../entities/room';
import User from '../entities/user';
import { createSystemMessage } from './message';

export const isPrivateRoomExist = async (userId: string, myId: string) => {
  try {
    // const room = await Room.createQueryBuilder('room')
    //   .leftJoinAndSelect('room.participants', 'participants')
    //   .where('room.type = :type', { type: 'private' })
    //   .andWhere('participants.userId IN (:...ids)', { ids: [userId, myId] })
    //   .getOneOrFail();
    // console.log('room', room)
    // return room;
    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const updateRoomLastMessage = async (
  lastMessage: Message,
  roomId: string
) => {
  try {
    await Room.createQueryBuilder('room')
      .update({ lastMessage })
      .where({ id: roomId })
      .execute();
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

    return participants.reduce(
      (acc, { room }) => {
        acc[0].push(room.id);
        const users = room.participants.map(({ user }) => user.socketId);
        acc[1] = [...acc[1], ...new Set(users)];

        return acc;
      },
      [[], []] as [string[], string[]]
    );
  } catch (error) {}
};

export const getRoomsAndCount = async (id: string) => {
  const [participants, count] = await Participant.createQueryBuilder(
    'participant'
  )
    .where('participant.user = :id', { id })
    .leftJoinAndSelect('participant.room', 'room')
    .leftJoinAndSelect('room.participants', 'participants')
    .leftJoinAndSelect('room.lastMessage', 'lastMessage')
    .leftJoinAndSelect('lastMessage.attachment', 'attachment')
    .leftJoinAndSelect('participants.user', 'user')
    .loadRelationCountAndMap(
      'room.unreadedMessagesCount',
      'room.messages',
      'message',
      qb =>
        qb
          .where('message.readed IS FALSE')
          .andWhere('message."authorId" != :author', { author: id })
    )
    .addOrderBy('room.updatedAt', 'DESC')
    .getManyAndCount();
  const rooms = participants.map(({ room }) => ({
    ...room,
    participants: room.participants.map(({ user }) => user),
  }));


  // const rooms = participants.map(({ room }) => ({
  //   ...room,
  //   participants: room.participants.map(({ user }) => {
  //     const { id, photo, online, name } = user;

  //     return { id, photo, online, name };
  //   }),
  // }));


  return { rooms, count };
};

type RoomProps = {
  data: Partial<Room>;
  users: { id: User; socketId: string }[];
  authorName: string;
};

export const addNewRoom = async ({ data, authorName, users }: RoomProps) => {
  try {
    const room = (await Room.create(data).save()) as Room;
    await Participant.create({ room, user: data.author }).save();

    for (let { id } of users) {
      await Participant.create({ room, user: id }).save();
    }

    if (data.type === 'group') {
      await createSystemMessage(`User ${authorName} created the chat`, room.id);
    }

    return (await Room.findOne({
      where: { id: room.id },
      relations: ['participants', 'participants.user', 'messages'],
    })) as Room;
  } catch (error) {
    console.log('Add new room error:', error);
  }
};

export const getOnlineParticipantsSocketId = async (id: string) => {
  const participant = await Participant.createQueryBuilder('participant')
    .where('participant.user = :id', { id })
    .leftJoinAndSelect('participant.room', 'room')
    .leftJoinAndSelect('room.participants', 'participants')
    .leftJoinAndSelect('participants.user', 'user')
    .getMany();

  const test = participant.reduce((acc, { room }) => {
    // const users = room.participants.user

    acc.push(...room.participants);
    return acc;
  }, [] as Participant[]);

  const socketIds = test.reduce((acc, { user }) => {
    if (user.online && user.id !== id && !acc.includes(user.socketId)) {
      acc.push(user.socketId);
    }

    return acc;
  }, [] as string[]);

  return socketIds;
};

// export const getFilteredMessages = async (id: string, filter: string) => {
//   await Participant.createQueryBuilder('participant')
//     .where('participant.user = :id', { id })
//     .leftJoinAndSelect('participant.room', 'room')
//     .leftJoinAndSelect('participants.user', 'user')
//     .loadRelationCountAndMap(
//       'room.unreadedMessagesCount',
//       'room.messages',
//       'message'
//     )
//     .addOrderBy('room.updatedAt', 'DESC')
//     .getManyAndCount();
// };
