import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';

import { ChatItem } from './item';
import { StyledChat, StyledMessageForm, StyledSubmitIcon, StyledTextareaAutosize } from './styled';

import send from '../../images/send.svg';
import arrow_back from '../../images/arrow_back.svg';
import { RoomsState } from '../../store/slices/rooms';

import { Empty } from '../../styles';
import { useAppSelector } from '../../store/hooks';
import { selectMyData } from '../../store/slices/user';
import { socket } from '../../api/socket';
import { selectMessages } from '../../store/slices/messages';

type Props = {
  selected: RoomsState['selected'];
};

export const Chat: FC<Props> = ({ selected }) => {
  const [typing, setTyping] = useState(false);
  const [message, setMessage] = useState('');

  const me = useAppSelector(selectMyData);
  const { data } = useAppSelector(selectMessages);

  if (!selected) {
    return (
      <StyledChat>
        <Empty>Сhoose who you would like to write to</Empty>
      </StyledChat>
    );
  }

  const isNewRoom = selected.roomId === null;

  const onSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitObject = {
      roomId: selected.roomId,
      author: me?.id,
      message,
      partner: selected.userId,
    };

    if (isNewRoom) {
      socket.emit('ROOMS:CREATE', { author: me?.id, userId: selected.userId });
      socket.on('ROOMS:CREATE', () => {
        socket.emit('ROOMS:SUBMIT', submitObject);
      });
    } else {
      socket.emit('ROOMS:SUBMIT', submitObject);
    }
  };

  const onChangeHandler = ({ target }: React.KeyboardEvent<HTMLTextAreaElement>) => {
    socket.emit('ROOMS:TYPING', { partner: selected.userId, user: me?.name, roomId: selected.roomId });
    setMessage(target.value);
  };

  return (
    <StyledChat>
      <div className='header'>
        {isNewRoom && (
          <span className='arrow'>
            <Image width='30px' height='30px' src={arrow_back} alt='arrow_back' />
          </span>
        )}
        <div>
          <p className='title'>{selected.name}</p>
          <p className='time'>was 50 minutes ago</p>
          {/* <p>was recently</p> */}
        </div>
      </div>
      <div className='messages'>
        {data.map(message => {
          const isMy = message.authorId === me?.id;

          return <ChatItem key={message.id} {...message} isMy={isMy} />;
        })}
      </div>
      <StyledMessageForm onSubmit={onSubmitMessage}>
        <StyledTextareaAutosize placeholder='To write a message...' onChange={onChangeHandler} />
        <StyledSubmitIcon>
          <Image width='30px' height='30px' src={send} alt='send' />
        </StyledSubmitIcon>
      </StyledMessageForm>
    </StyledChat>
  );
};
