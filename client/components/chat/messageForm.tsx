import Image from 'next/image';

import React, { FC, memo } from 'react';
import {
  StyledMessageForm,
  StyledSubmitIcon,
  StyledTextareaAutosize,
} from './styles';
import send from 'images/send.svg';

import { useMessageForm } from './useMessageForm';

type Props = {
  selected: string;
};

export const MessageForm: FC<Props> = memo(({ selected }) => {
  const { message, onChangeHandler, onSubmitMessage } =
    useMessageForm(selected);

  return (
    <StyledMessageForm onSubmit={onSubmitMessage}>
      <StyledTextareaAutosize
        placeholder='To write a message...'
        onChange={onChangeHandler}
        value={message}
      />
      <StyledSubmitIcon disabled={!message.trim().length}>
        <Image width='30px' height='30px' src={send} alt='send' />
      </StyledSubmitIcon>
    </StyledMessageForm>
  );
});

MessageForm.displayName = 'MessageForm';
