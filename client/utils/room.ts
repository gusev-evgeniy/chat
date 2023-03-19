import dayjs from 'dayjs';

import { Room } from 'types/room';
import { UserBD } from 'types/user';

export const preparedRooms = (rooms: Room[], myId: string) => {
  return rooms.map(
    ({
      type,
      title: roomTitle,
      id,
      participants,
      photo: roomImage,
      lastMessage,
      unreadedMessagesCount,
    }) => {
      if (type === 'group') {
        return {
          id,
          image: roomImage,
          title: roomTitle as string,
          online: false,
          lastMessage,
          unreadedMessagesCount,
          participantId: '',
          participants,
          type
        };
      }

      const {
        id: participantId,
        name,
        photo,
        online
      } = participants.find(({ id }) => id !== myId) as UserBD;

      return {
        id,
        participantId,
        title: name,
        image: photo,
        online,
        participants,
        lastMessage,
        unreadedMessagesCount,
        type
      };
    }
  );
};

export const getRoomInfo = (
  { type, title: roomTitle, id: roomId, participants, photo: roomImage }: Room,
  myId: string
) => {
  if (type === 'group') {
    return {
      image: roomImage,
      title: roomTitle as string,
      id: roomId,
      online: false,
    };
  }

  const { id, name, photo, online } = participants.find(
    ({ id }) => id !== myId
  ) as UserBD;

  return { id, title: name, image: photo, online };
};

export const createOnlineSubstring = (
  privateUser: UserBD | undefined,
  participants: UserBD[]
) => {
  return privateUser
    ? dayjs(privateUser.wasOnline).format('YYYY-MM-DD')
    : `${participants.length} участников, ${
        participants.filter(({ online }) => online).length
      } в сети`;
};
