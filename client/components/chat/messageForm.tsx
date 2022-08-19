import Image from 'next/image'
import React, { FC, memo, useState } from 'react'
import { StyledMessageForm, StyledSubmitIcon, StyledTextareaAutosize } from './styled'
import send from '../../images/send.svg';
import { socket } from '../../api/socket';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectMyData } from '../../store/slices/user';
import { RoomsState } from '../../store/slices/rooms';
import { EVENTS } from '../../utils/constants';

type Props = {
  selected: RoomsState['selected'];
};

export const MessageForm: FC<Props>  = memo(({ selected }) => {
  const [message, setMessage] = useState('');

  const me = useAppSelector(selectMyData);

  if (!selected || !me) {
    return null;
  }

  const onChangeHandler = ({ target }: React.KeyboardEvent<HTMLTextAreaElement>) => {
    socket.emit(EVENTS.MESSAGE.TYPING, { partner: selected.userId, user: me?.name, roomId: selected.roomId });
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

    const isNewRoom = selected.roomId === null;

    if (isNewRoom) {
      socket.emit(EVENTS.ROOM.CREATE_PRIVATE, { author: me?.id, userId: selected.userId }, ({ roomId }: { roomId: string }) => {
        socket.emit(EVENTS.MESSAGE.MESSAGE_CREATE, { ...submitObject, roomId });
      });
    } else {
      socket.emit(EVENTS.MESSAGE.MESSAGE_CREATE, submitObject);
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