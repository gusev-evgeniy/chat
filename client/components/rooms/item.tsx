import React, { FC, memo, useMemo } from 'react';
import dayjs from 'dayjs';

import { Room as RoomType } from '../../type/room';
import { returnTypingText } from '../../utils/message';
import { Avatar } from '../avatar';
import { StyledLastMessage, StyledRoom } from './styled';
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

export const Room: FC<Props> = memo(({ typing, myId, isSelected, onSelecteHandler, room }) => {
  const { id, type, lastMessage, unreadedMessagesCount } = room || {};
  const { createdAt, text, readed, authorId } = lastMessage || {};

  const time = dayjs(createdAt).format('HH:mm');

  const { image, title, online } = useMemo<RoomInfo>(() => getRoomInfo(room, myId), [room.participants, myId]);
  const typingText = useMemo(() => returnTypingText(typing, type), [typing, type]);
  console.log('online', online)
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
            <StyledLastMessage unreaded={true}>{typingText}</StyledLastMessage>
          ) : (
            <StyledLastMessage unreaded={myId !== authorId && !readed}>{text}</StyledLastMessage>
          )}
          {!!unreadedMessagesCount && <p className='count'>{unreadedMessagesCount}</p>}
        </div>
      </div>
    </StyledRoom>
  );
});

Room.displayName = 'Room';
