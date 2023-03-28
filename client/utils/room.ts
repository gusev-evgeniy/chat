import dayjs from 'dayjs';

import { Room } from 'types/room';
import { UserBD } from 'types/user';

// dayjs.extend(relativeTime)

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
      background: roomBackground
    }) => {
      const data = {
        id,
        participants,
        type,
        lastMessage,
        unreadedMessagesCount,
        typing: [] as string[],
      }

      if (type === 'group') {
        return {
          ...data,
          image: roomImage,
          title: roomTitle as string,
          online: false,
          participantId: '',
          background: roomBackground
        };
      }

      const {
        id: participantId,
        name,
        photo,
        online,
        background
      } = participants.find(({ id }) => id !== myId)!;

      return {
        ...data,
        participantId,
        title: name,
        image: photo,
        online,
        background
      };
    }
  );
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