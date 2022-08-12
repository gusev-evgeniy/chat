import Image from 'next/image';
import React, { FC, memo } from 'react';
import { StyledChatItem } from './styled';

import readedIcon from '../../images/readed.svg';
import { Message } from '../../type/messages';

import dayjs from 'dayjs';
import { StyledAva } from '../auth/styles';

type Props = Message & { isMy: boolean; isLast: boolean };

export const ChatItem: FC<Props> = memo(({ isMy, text, createdAt, readed, isLast, author }) => {
  const time = dayjs(createdAt).format('HH:mm');

  return (
    <StyledChatItem my={isMy} isLast={isLast}>
      <div className='item'>
        <p className='message '>{text}</p>
        <span className='time'>{time}</span>
        {readed && (
          <div className='readed_icon'>
            <Image width='18px' height='18px' src={readedIcon} alt='search' />
          </div>
        )}
      </div>
      {isLast && <StyledAva size={35} backgroundImage={author.photo} />}
    </StyledChatItem>
  );
});

ChatItem.displayName = 'ChatItem';
