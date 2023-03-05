import Image from 'next/image';
import React, { FC, memo } from 'react';

import { useAppDispatch } from 'store/hooks';
import { uploadFile } from 'store/actions/messages';

import { useMessageForm } from './useMessageForm';

import attach from 'images/attach.svg';

import {
  AttachIcon,
  StyledMessageForm,
  StyledTextareaAutosize,
} from '../styles';

export const Form: FC<{}> = memo(() => {
  const dispatch = useAppDispatch();

  const { message, onChangeHandler, onSubmitMessage } =
    useMessageForm();

  const onAttachFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const files = target.files;
    if (!files || files.length === 0) {
      return;
    }

    dispatch(uploadFile(files[0]));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmitMessage()
    }
  }

  return (
    <StyledMessageForm >
      <StyledTextareaAutosize
        placeholder='To write a message...'
        onKeyDown={handleKeyDown}
        onChange={onChangeHandler}
        value={message}
      />

      <AttachIcon htmlFor='inputTag'>
        <Image width='30px' height='30px' src={attach} alt='add_photo' />
        <input id='inputTag' type='file' onChange={onAttachFile} hidden />
      </AttachIcon>
    </StyledMessageForm>
  );
});

Form.displayName = 'MessageForm';
