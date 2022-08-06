import React from 'react';
import { ChatItem } from './item';
import { StyledChat, StyledMessageForm, StyledSubmitIcon, StyledTextareaAutosize } from './styled';

import send from '../../images/send.svg';
import Image from 'next/image';

export const Chat = () => {
  return (
    <StyledChat>
      <div className='messages'>
        <ChatItem isReaded={true} message={'Привет'} time={'18:57'} />
        <ChatItem isReaded={false} message={'Привет. как дела?'} time={'18:58'} />
        <ChatItem isReaded={true} message={'норм'} time={'19:20'} />
        <ChatItem isReaded={true} message={'а твои?'} time={'19:21'} />
      </div>
      <StyledMessageForm>
        <StyledTextareaAutosize placeholder='To write a message...' />
        <StyledSubmitIcon>
          <Image width='30px' height='30px' src={send} alt='send' />
        </StyledSubmitIcon>
      </StyledMessageForm>
    </StyledChat>
  );
};
