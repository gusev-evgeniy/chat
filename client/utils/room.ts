import dayjs from 'dayjs';

import { Room } from 'types/room';
import { UserBD } from 'types/user';

export const prepareRooms = (rooms: Room[], myId: string) => {
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
      const data = {
        id,
        participants,
        type,
        lastMessage,
        unreadedMessagesCount,
        typing: [] as string[]
      }

      if (type === 'group') {
        return {
          ...data,
          image: roomImage,
          title: roomTitle as string,
          online: false,
          participantId: '',
        };
      }

      const {
        id: participantId,
        name,
        photo,
        online
      } = participants.find(({ id }) => id !== myId) as UserBD;

      return {
        ...data,
        participantId,
        title: name,
        image: photo,
        online,
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
