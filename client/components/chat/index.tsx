import React, { FC, Fragment, useEffect, useState } from 'react';
import Image from 'next/image';

import { ChatItem } from './item';
import { StyledChat, StyledMessageForm, StyledSubmitIcon, StyledTextareaAutosize } from './styled';

import send from '../../images/send.svg';
import arrow_back from '../../images/arrow_back.svg';
import { RoomsState } from '../../store/slices/rooms';

import { Empty } from '../../styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectMyData } from '../../store/slices/user';
import { socket } from '../../api/socket';
import { selectMessages } from '../../store/slices/messages';
import dayjs from 'dayjs';

type Props = {
  selected: RoomsState['selected'];
  typing: object[];
};

export const Chat: FC<Props> = ({ selected, typing }) => {
  const [message, setMessage] = useState('');
  console.log('typing', typing);
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
      console.log('here');
      // socket.connect();
      socket.emit('ROOMS:CREATE', { author: me?.id, userId: selected.userId }, ({ roomId }) => {
        console.log('roomId', roomId);
        socket.emit('ROOMS:SUBMIT', { ...submitObject, roomId });
      });
    } else {
      console.log('33333');
      socket.emit('ROOMS:SUBMIT', submitObject);
    }

    setMessage('');
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
      <div className='messages_wrapper'>
        <div className='messages'>
          {data.map((message, index) => {
            const getDay = (createdAt: string) => dayjs(createdAt).format('YYYY-MM-DD');

            const isMy = message.author.id === me?.id;
            const isLast = data[index + 1]?.author.id !== message.author.id;
            const isNewDay = getDay(data[index - 1]?.createdAt) !== getDay(message.createdAt);

            return (
              <Fragment key={message.id}>
                {isNewDay && <Empty margin='15px'>{dayjs(message.createdAt).format('DD MMMM')}</Empty>}
                <ChatItem {...message} isMy={isMy} isLast={isLast} />
              </Fragment>
            );
          })}
          <div className='typing'>{!!typing.length ? `${me?.name} печатает...` : ''}</div>
        </div>
      </div>
      <StyledMessageForm onSubmit={onSubmitMessage}>
        <StyledTextareaAutosize
          placeholder='To write a message...'
          onChange={onChangeHandler}
          value={message}
        />
        <StyledSubmitIcon disabled={!message.length}>
          <Image width='30px' height='30px' src={send} alt='send' />
        </StyledSubmitIcon>
      </StyledMessageForm>
    </StyledChat>
  );
};
