import React, { FC, memo, useMemo } from 'react';
import dayjs from 'dayjs';

import { returnTypingText } from 'utils/message';
import { getRoomInfo } from 'utils/room';

import { Avatar } from 'components/avatar';

import { StyledLastMessage, StyledRoom } from './styles';
import { Rooms } from 'store/slices/rooms';

type Props = {
  room: Rooms[0];
  myId: string;
  isSelected: boolean;
  onSelecteHandler: (id: string) => void;
  typing: string[] | undefined;
};

export const Room: FC<Props> = memo(
  ({ typing, myId, isSelected, onSelecteHandler, room }) => {
    const {
      id,
      type,
      lastMessage,
      unreadedMessagesCount,
      image,
      title,
      online,
    } = room || {};
    const { createdAt, text, readed, authorId } = lastMessage || {};

    const time = dayjs(createdAt).format('HH:mm');
    const typingText = returnTypingText(typing, type);

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
            {typingText ? (
              <StyledLastMessage unreaded={true}>
                {typingText}
              </StyledLastMessage>
            ) : (
              <StyledLastMessage unreaded={myId !== authorId && !readed}>
                {text}
              </StyledLastMessage>
            )}
            {!!unreadedMessagesCount && (
              <p className='count'>{unreadedMessagesCount}</p>
            )}
          </div>
        </div>
      </StyledRoom>
    );
  }
);

Room.displayName = 'Room';
