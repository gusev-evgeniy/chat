import Image from 'next/image';

import React, { FC, memo, useRef } from 'react';
import {
  AttachIcon,
  StyledMessageForm,
  StyledSubmitIcon,
  StyledTextareaAutosize,
} from '../styles';
import send from 'images/send.svg';
import attach from 'images/attach.svg';

import { useMessageForm } from './useMessageForm';

type Props = {
  selected: string;
};

export const Form: FC<Props> = memo(({ selected }) => {
  const { message, onChangeHandler, onSubmitMessage, onAttachFile } =
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

      <AttachIcon htmlFor='inputTag'>
        <Image width='30px' height='30px' src={attach} alt='add_photo' />
        <input id='inputTag' type='file' onChange={onAttachFile} hidden />
      </AttachIcon>
    </StyledMessageForm>
  );
});

Form.displayName = 'MessageForm';
