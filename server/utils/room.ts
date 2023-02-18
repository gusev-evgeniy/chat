import Message from '../entities/message';
import Participant from '../entities/participants';
import Room from '../entities/room';
import User from '../entities/user';

export const isPrivateRoomExist = async (userId: string, myId: string) => {
  console.log(
    'userId_________________________________________________________',
    userId
  );
  console.log('myId____________________________________________________', myId);
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

    console.log('participants', participants)

    return participants.reduce(
      (acc, { room }) => {
        acc[0].push(room.id);
          console.log('room.participants.', room.participants)
        const users = room.participants.map(({ user }) => user.socketId);
        console.log('users', new Set(users))
        console.log('cc[1]', acc[1])
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
    participants: room.participants.map(({ user }) => {
      return user;
    }),
  }));

  return { rooms, count };
};

export const createSystemMessage = async (text: string, roomId: string) => {
  return await Message.create({
    text,
    room: { id: roomId },
    roomId,
    isSystem: true,
    readed: true,
  }).save();
};

// export const addNewRoom = async (author: User, userId: User ) => {
//   const room = await Room.create({ author }).save();
//   await Participant.create({ room, user: userId }).save();
//   await Participant.create({ room, user: author }).save();

//   return await Room.findOne({
//     where: { id: room.id },
//     relations: ['participants', 'participants.user'],
//   }) as Room;
// }

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
  console.log('Add new room error:', error)
}
};
