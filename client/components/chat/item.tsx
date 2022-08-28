import Image from 'next/image';
import React, { FC, memo } from 'react';
import { StyledChatItem, StyledSystemMessage } from './styled';

import readedIcon from '../../images/readed.svg';
import unreadedIcon from '../../images/unreaded.svg';
import { Message } from '../../type/messages';

import dayjs from 'dayjs';
import { StyledAva } from '../avatar/styles';

type Props = Message & { isMy?: boolean; isLast: boolean };

export const ChatItem: FC<Props> = memo(({ isMy, text, createdAt, readed, isLast, author, id, isSystem }) => {
  const { photo } = author || {};

  const time = dayjs(createdAt).format('HH:mm');

  if (isSystem) {
    return <StyledSystemMessage>{text}</StyledSystemMessage>
  }
  
  return (
    <StyledChatItem my={isMy} isLast={isLast} data-id={id}>
      <div className='item'>
        <p className='message'>{text}</p>
        <span className='time'>{time}</span>
        {isMy && (
          <div className='readed_icon'>
            <Image width='18px' height='18px' src={readed ? readedIcon : unreadedIcon} alt='search' />
          </div>
        )}
      </div>
      {isLast && <StyledAva size={35} backgroundImage={photo ? photo : undefined} />}
    </StyledChatItem>
  );
});

ChatItem.displayName = 'ChatItem';
