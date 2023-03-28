import dayjs from 'dayjs';
import moment from 'moment';

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
      background: roomBackground,
    }) => {
      const data = {
        id,
        participants,
        type,
        lastMessage,
        unreadedMessagesCount,
        typing: [] as string[],
      };

      if (type === 'group') {
        return {
          ...data,
          image: roomImage,
          title: roomTitle as string,
          online: false,
          participantId: '',
          background: roomBackground,
        };
      }

      const {
        id: participantId,
        name,
        photo,
        online,
        background,
      } = participants.find(({ id }) => id !== myId)!;

      return {
        ...data,
        participantId,
        title: name,
        image: photo,
        online,
        background,
      };
    }
  );
};

export const getGroupSubstring = (
  participants: UserBD[]
) => {
  return `${participants.length} members, ${
    participants.filter(({ online }) => online).length
  } online`;
};
