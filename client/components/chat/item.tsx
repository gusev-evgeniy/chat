import Image from 'next/image';
import React from 'react';
import { StyledChatItem } from './styled';

import readed from '../../images/readed.svg';

export const ChatItem = ({ message, time, isReaded }) => {
  return (
    <StyledChatItem my={!isReaded}>
      <div className='item'>
        <p className='message '>{message}</p>
        <span className='time'>{time}</span>
        {isReaded && (
          <div className='readed_icon'>
            <Image width='18px' height='18px' src={readed} alt='search' />
          </div>
        )}
      </div>
    </StyledChatItem>
  );
};
