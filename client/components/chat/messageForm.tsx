import Image from 'next/image';
import React, { FC, memo, useRef, useState } from 'react';
import { StyledMessageForm, StyledSubmitIcon, StyledTextareaAutosize } from './styled';
import send from '../../images/send.svg';
import { socket } from '../../api/socket';
import { useAppSelector } from '../../store/hooks';
import { selectMyData } from '../../store/slices/user';
import { RoomsState } from '../../store/slices/rooms';
import { EVENTS } from '../../utils/constants';

type Props = {
  selected: RoomsState['selected'];
};

export const MessageForm: FC<Props> = memo(({ selected }) => {
  const [message, setMessage] = useState('');
  const typingTimeoutId = useRef();

  const me = useAppSelector(selectMyData);

  if (!selected || !me) {
    return null;
  }

  const onChangeHandler = ({ target }: React.KeyboardEvent<HTMLTextAreaElement>) => {
    socket.emit(EVENTS.MESSAGE.TYPING, { user: me?.name, roomId: selected.id, isTyping: true });

    clearInterval(typingTimeoutId.current);

    typingTimeoutId.current = setTimeout(() => {
      socket.emit(EVENTS.MESSAGE.TYPING, { user: me?.name, roomId: selected.id, isTyping: false });
    }, 3000);

    setMessage(target.value);
  };

  const onSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitObject = {
      roomId: selected.id,
      author: me?.id,
      message,
      type: selected.type,
    };

    const isNewRoom = selected.id === null;

    if (isNewRoom) {
      socket.emit(
        EVENTS.ROOM.CREATE_PRIVATE,
        { author: me?.id, userId: selected.id },
        ({ roomId }: { roomId: string }) => {
          socket.emit(EVENTS.MESSAGE.MESSAGE_CREATE, { ...submitObject, roomId });
        }
      );
    } else {
      socket.emit(EVENTS.MESSAGE.MESSAGE_CREATE, submitObject);
    }

    setMessage('');
    clearInterval(typingTimeoutId.current);
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
  );
});

MessageForm.displayName = 'MessageForm';
