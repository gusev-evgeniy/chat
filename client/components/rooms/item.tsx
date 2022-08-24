import React, { FC, memo, useMemo } from 'react';
import dayjs from 'dayjs';

import { Room as RoomType } from '../../type/room';
import { returnTypingText } from '../../utils/message';
import { Avatar } from '../avatar';
import { StyledRoom } from './styled';
import { getRoomInfo } from '../../utils/room';

type Props = {
  room: RoomType;
  myId: string;
  isSelected: boolean;
  onSelecteHandler: (id: string) => void;
  typing: string[] | undefined;
};

type RoomInfo = {
  id: string;
  title: string;
  image: string | null;
  online: boolean;
};

export const Room: FC<Props> = memo(
  ({ typing, myId, isSelected, onSelecteHandler, room }) => {
    const {
      id,
      type,
      lastMessage,
      unreadedMessagesCount,
    } = room || {};
    const { createdAt, text } = lastMessage || {};

    const time = dayjs(createdAt).format('HH:mm');

    const { image, title, online } = useMemo<RoomInfo>(() => getRoomInfo(room, myId), []);
    const typingText = useMemo(() => returnTypingText(typing, type), [typing, type]);

    return (
      <StyledRoom selected={isSelected} onClick={() => onSelecteHandler(id)}>
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
