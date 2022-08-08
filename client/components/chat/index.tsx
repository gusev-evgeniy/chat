import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';

import { ChatItem } from './item';
import { StyledChat, StyledMessageForm, StyledSubmitIcon, StyledTextareaAutosize } from './styled';

import send from '../../images/send.svg';
import arrow_back from '../../images/arrow_back.svg';
import { RoomsState } from '../../store/slices/rooms';

import { Empty } from '../../styles';
import { useSocket } from '../../hooks/useSocket';
import { useAppSelector } from '../../store/hooks';
import { selectMyData } from '../../store/slices/user';

type Props = {
  selected: RoomsState['selected'];
};

export const Chat: FC<Props> = ({ selected }) => {
  const socket = useSocket();

  const [typing, setTyping] = useState(false);
  const me = useAppSelector(selectMyData);


  useEffect(() => {
    socket.on('ROOMS:TYPING', () => console.log('typing'));
  }, []);

  if (!selected) {
    return (
      <StyledChat>
        <Empty>Сhoose who you would like to write to</Empty>
      </StyledChat>
    );
  }

  const onSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('ROOMS:SUBMIT', { dialogId: selected, user: me });
  };

  const onTypeMessage = () => {
    console.log('11')
    socket.emit('ROOMS:TYPING', { dialogId: selected, user: me });
  };

  return (
    <StyledChat>
      <div className='header'>
        {/* <span className='arrow'>
          <Image width='30px' height='30px' src={arrow_back} alt='arrow_back' />
        </span> */}
        <div>
          <p className='title'>Title</p>
          <p className='time'>was 50 minutes ago</p>
          {/* <p>was recently</p> */}
        </div>
      </div>
      <div className='messages'></div>
      <StyledMessageForm onSubmit={onSubmitMessage}>
        <StyledTextareaAutosize placeholder='To write a message...' onKeyDown={onTypeMessage} />
        <StyledSubmitIcon>
          <Image width='30px' height='30px' src={send} alt='send' />
        </StyledSubmitIcon>
      </StyledMessageForm>
    </StyledChat>
  );
};
