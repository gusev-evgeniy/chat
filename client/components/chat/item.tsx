import Image from 'next/image';
import React, { FC, memo } from 'react';
import { StyledChatItem } from './styled';

import readedIcon from '../../images/readed.svg';
import { Message } from '../../type/messages';

import dayjs from 'dayjs';

type Props = Message & { isMy: boolean };

export const ChatItem: FC<Props> = memo(({ isMy, text, createdAt, readed }) => {
  const time = dayjs(createdAt).format('hh:mm');

  return (
    <StyledChatItem my={isMy}>
      <div className='item'>
        <p className='message '>{text}</p>
        <span className='time'>{time}</span>
        {readed && (
          <div className='readed_icon'>
            <Image width='18px' height='18px' src={readedIcon} alt='search' />
          </div>
        )}
      </div>
    </StyledChatItem>
  );
});

ChatItem.displayName = 'ChatItem';
