import Image from 'next/image';
import React, { FC, memo } from 'react';

import { useAppDispatch } from 'store/hooks';
import { uploadFile } from 'store/actions/messages';

import { useMessageForm } from './useMessageForm';

import attach from 'images/attach.svg';
import smile from 'images/smile.svg';
import mic from 'images/mic.svg';

import {
  AttachIcon,
  MicIcon,
  SmileIcon,
  StyledMessageForm,
  StyledTextareaAutosize,
} from '../styles';
import { useRecord } from './useRecord';

export const Form: FC<{}> = memo(() => {
  const dispatch = useAppDispatch();

  const { message, onChangeHandler, onSubmitMessage } =
    useMessageForm();

    const { isRecording, onRecord, stopRecord } = useRecord();

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

  console.log('isRecording', isRecording)

  return (
    <StyledMessageForm >
      <StyledTextareaAutosize
        placeholder='To write a message...'
        onKeyDown={handleKeyDown}
        onChange={onChangeHandler}
        value={isRecording ? 'Recording...' : message}
        disabled={isRecording}
      />

      <AttachIcon htmlFor='attach'>
        <Image width='30px' height='30px' src={attach} alt='attach file' />
        <input id='attach' type='file' onChange={onAttachFile} hidden />
      </AttachIcon>

      <SmileIcon htmlFor='smile'>
        <Image width='30px' height='30px' src={smile} alt='smile' />
        <input id='smile' type='file' onChange={onAttachFile} hidden />
      </SmileIcon>

      <MicIcon htmlFor='mic' onClick={isRecording ? stopRecord : onRecord}>
        <Image width='30px' height='30px' src={mic} alt='mic' />
        {/* <input id='mic' type='file' onChange={onAttachFile} hidden /> */}
      </MicIcon>
    </StyledMessageForm>
  );
});

Form.displayName = 'MessageForm';
