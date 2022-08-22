import React, { FC, memo, useMemo } from 'react';
import dayjs from 'dayjs';

import { Room as RoomType } from '../../type/room';
import { UserBD } from '../../type/user';
import { returnTypingText } from '../../utils/message';
import { Avatar } from '../avatar';
import { StyledRoom } from './styled';

type Props = {
  room: RoomType;
  myId: string;
  isSelected: boolean;
  selectRoom: (id: string) => void;
  toggleNewRoom: (isOpen: boolean) => void;
  typing: string[] | undefined;
  getMessages: (roomId: string) => void;
};

type RoomInfo = {
  id: string;
  title: string;
  image: string | null;
  online: boolean;
};

export const Room: FC<Props> = memo(
  ({ typing, myId, isSelected, selectRoom, toggleNewRoom, getMessages, room }) => {
    const {
      participants,
      id: roomId,
      type,
      title: roomTitle,
      lastMessage,
      unreadedMessagesCount,
    } = room || {};
    const { createdAt, text } = lastMessage || {};

    const time = dayjs(createdAt).format('HH:mm');

    const { image, title, id, online } =
      useMemo<RoomInfo>(() => {
        if (type === 'group') {
          return { image: null, title: roomTitle as string, id: roomId, online: false };
        }

        const { id, name, photo, online } = participants.find(({ id }) => id !== myId) as UserBD;
        return { id, title: name, image: photo, online };
      }, [room]) || {};

    const typingText = useMemo(() => returnTypingText(typing, type), [typing, type]);

    const onSelecteHandler = () => {
      toggleNewRoom(false);
      if (isSelected) {
        return;
      }

      getMessages(roomId);
      selectRoom(roomId);
    };

    return (
      <StyledRoom selected={isSelected} onClick={onSelecteHandler}>
        <Avatar name={title} photo={image} size={50} online={online} />
        <div className='data'>
          <div className='info'>
            <p className='name bold'>{title}</p>
            <div className='time'>
              <div className='icon' />
              {time}
            </div>
          </div>
          <div className='messages'>
            {typingText ? <p className='message typing'>{typingText}</p> : <p className='message'>{text}</p>}
            {!!unreadedMessagesCount && <p className='count'>{unreadedMessagesCount}</p>}
          </div>
        </div>
      </StyledRoom>
    );
  }
);

Room.displayName = 'Room';
