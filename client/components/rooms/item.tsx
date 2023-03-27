import React, { FC, memo } from 'react';
import dayjs from 'dayjs';

import { Avatar } from 'components/avatar';

import { StyledLastMessage, StyledRoom } from './styles';
import { Rooms } from 'store/slices/rooms';
import { getLastMessageText } from 'utils/message';

type Props = {
  room: Rooms[0];
  myId: string;
  isSelected: boolean;
  onSelecteHandler: (id: string) => void;
  typingText: string;
};

export const Room: FC<Props> = memo(
  ({ typingText, myId, isSelected, onSelecteHandler, room }) => {
    const {
      id,
      lastMessage,
      unreadedMessagesCount,
      image,
      title,
      online,
      background
    } = room || {};
    const { createdAt, readed, authorId } = lastMessage || {};

    const time = dayjs(createdAt).format('HH:mm');
    const lastMessageText = getLastMessageText(lastMessage)

    return (
      <StyledRoom selected={isSelected} onClick={() => onSelecteHandler(id)}>
        <Avatar name={title} photo={image} size={50} online={online} gradient={background} />
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
                {lastMessageText}
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
