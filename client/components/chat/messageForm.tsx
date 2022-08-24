import Image from 'next/image';

import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { StyledMessageForm, StyledSubmitIcon, StyledTextareaAutosize } from './styled';
import send from '../../images/send.svg';
import { useAppDispatch } from '../../store/hooks';
import { createMessage, createPrivateRoom, sendTyping } from '../../store/actions';
import { NEW_ROOM } from '../../utils/constants';

type Props = {
  selected: string;
};

export const MessageForm: FC<Props> = memo(({ selected }) => {
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState<boolean | null>(null);
  
  const typingTimeoutId = useRef<NodeJS.Timeout | undefined>();
  const isNewRoom = selected === NEW_ROOM;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isNewRoom || typing === null) {
      return;
    }

    dispatch(sendTyping(typing));
  }, [typing, isNewRoom, dispatch]);

  const onChangeHandler = ({ target }: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setTyping(true);
    clearInterval(typingTimeoutId.current);

    typingTimeoutId.current = setTimeout(() => {
      setTyping(false);
    }, 3000);

    setMessage(target.value);
  };

  const onSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNewRoom) dispatch(createPrivateRoom(message));
    else createMessage(selected, message);

    setMessage('');
    clearInterval(typingTimeoutId.current);
    setTyping(false);
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
