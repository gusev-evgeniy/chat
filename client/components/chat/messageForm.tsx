import Image from 'next/image'
import React, { FC, memo, useState } from 'react'
import { StyledMessageForm, StyledSubmitIcon, StyledTextareaAutosize } from './styled'
import send from '../../images/send.svg';
import { socket } from '../../api/socket';
import { useAppSelector } from '../../store/hooks';
import { selectMyData } from '../../store/slices/user';
import { RoomsState } from '../../store/slices/rooms';

type Props = {
  selected: RoomsState['selected'];
};

export const MessageForm: FC<Props>  = memo(({ selected }) => {
  const [message, setMessage] = useState('');
  const me = useAppSelector(selectMyData);

  if (!selected) {
    return null;
  }

  const onChangeHandler = ({ target }: React.KeyboardEvent<HTMLTextAreaElement>) => {
    socket.emit('ROOMS:TYPING', { partner: selected.userId, user: me?.name, roomId: selected.roomId });
    setMessage(target.value);
  };

  const onSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitObject = {
      roomId: selected.roomId,
      author: me?.id,
      message,
      partner: selected.userId,
      type: selected.type
    };

    console.log('submitObject', submitObject)
    const isNewRoom = selected.roomId === null;

    if (isNewRoom) {
      console.log('here');
      socket.emit('ROOMS:CREATE', { author: me?.id, userId: selected.userId }, ({ roomId }: { roomId: string }) => {
        console.log('roomId', roomId);
        socket.emit('MESSAGE:CREATE', { ...submitObject, roomId });
      });
    } else {
      console.log('33333');
      socket.emit('MESSAGE:CREATE', submitObject);
    }

    setMessage('');
  };


  return (
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
  )
})

MessageForm.displayName = 'MessageForm';