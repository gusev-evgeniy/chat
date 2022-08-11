import React, { FC, useEffect, useState } from 'react';
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
import { addMessagesData, selectMessages } from '../../store/slices/messages';

type Props = {
  selected: RoomsState['selected'];
};

export const Chat: FC<Props> = ({ selected }) => {
  const [typing, setTyping] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch = useAppDispatch();

  const me = useAppSelector(selectMyData);
  const { data } = useAppSelector(selectMessages);

  // useEffect(() => {
  //   socket.on('ROOMS:NEW_MESSAGE_CREATED', obj => {
  //     console.log('NEW_MESSAGE_CREATED1111111111111111', obj);
  //   });
  // }, []);

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
      socket.emit('ROOMS:CREATE', { author: me?.id, userId: selected.userId }, ({ roomId }) => {
        socket.emit('ROOMS:SUBMIT', { ...submitObject, roomId }, obj => {
          console.log('SUBMIT', obj);
        });
      });
    } else {
      console.log('33333');
      socket.emit('ROOMS:SUBMIT', submitObject, obj => {
        console.log('SUBMIT', obj);
        dispatch(addMessagesData(obj));
      });
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
      <div className='messages'>
        {data.map(message => {
          const isMy = message.author.id === me?.id;

          return <ChatItem key={message.id} {...message} isMy={isMy} />;
        })}
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
