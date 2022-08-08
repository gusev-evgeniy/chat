import React, { FC } from 'react';
import Image from 'next/image';

import { ChatItem } from './item';
import { StyledChat, StyledMessageForm, StyledSubmitIcon, StyledTextareaAutosize } from './styled';

import send from '../../images/send.svg';
import arrow_back from '../../images/arrow_back.svg';
import { RoomsState } from '../../store/slices/rooms';

import { Empty } from '../../styles';



type Props = {
  selected: RoomsState['selected'];
};

export const Chat: FC<Props> = ({ selected }) => {
  if (!selected) {
    return (
      <StyledChat>
        <Empty>Сhoose who you would like to write to</Empty>
      </StyledChat>
    );
  }

  if (selected) {
    <StyledChat>
      <Empty>Сhoose who you would like to write to</Empty>
    </StyledChat>;
  }

  console.log('selected', selected);
  return (
    <StyledChat>
      <div className='header'>
        <span className='arrow'>
          <Image width='30px' height='30px' src={arrow_back} alt='arrow_back' />
        </span>
        <div>
          <p className='title'>Title</p>
          <p className='time'>was 50 minutes ago</p>
          {/* <p>was recently</p> */}
        </div>
      </div>
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
