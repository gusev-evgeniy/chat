import Image from 'next/image';
import React, { FC, memo } from 'react';

import { useAppDispatch } from 'store/hooks';
import { uploadFile } from 'store/actions/messages';

import { useMessageForm } from './useMessageForm';

import attach from 'images/attach.svg';
import smile from 'images/smile.svg';
import mic from 'images/mic.svg';
import send from 'images/send.svg';

import {
  AttachIcon,
  MicIcon,
  SmileIcon,
  StyledMessageForm,
  StyledSubmitIcon,
  StyledTextareaAutosize,
} from '../styles';
import { useRecord } from './useRecord';
import { RecordForm } from './recordForm';
import { Emoji } from './emoji';

export const Form: FC<{}> = memo(() => {
  const dispatch = useAppDispatch();

  const {
    message,
    onChangeHandler,
    onSubmitMessage,
    isEmojiOpen,
    rextareaRef,
    toggleEmoji,
    pickEmoji,
    closeEmoji,
  } = useMessageForm();

  const { isRecording, onRecord, stop, submit } = useRecord();

  const onAttachFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const files = target.files;
    if (!files || files.length === 0) {
      return;
    }

    closeEmoji();
    dispatch(uploadFile(files[0]));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmitMessage();
    }
  };

  const canSubmit = message.trim().length > 0;

  if (isRecording) {
    return <RecordForm submit={submit} cancel={stop} />;
  }

  return (
    <>
      {isEmojiOpen && <Emoji pickEmoji={pickEmoji} />}

      <StyledMessageForm onSubmit={onSubmitMessage}>
        <StyledTextareaAutosize
          placeholder='Write a message...'
          onKeyDown={handleKeyDown}
          onChange={onChangeHandler}
          value={message}
          ref={rextareaRef}
        />

        <AttachIcon htmlFor='attach' onClick={() => closeEmoji()}>
          <Image width='30px' height='30px' src={attach} alt='attach file' />
          <input id='attach' type='file' onChange={onAttachFile} hidden />
        </AttachIcon>

        <SmileIcon htmlFor='smile' onClick={toggleEmoji}>
          <Image width='30px' height='30px' src={smile} alt='smile' />
        </SmileIcon>

        {canSubmit ? (
          <StyledSubmitIcon disabled={!canSubmit}>
            <Image width='30px' height='30px' src={send} alt='send' />
          </StyledSubmitIcon>
        ) : (
          <MicIcon onClick={onRecord}>
            <Image width='30px' height='30px' src={mic} alt='mic' />
          </MicIcon>
        )}
      </StyledMessageForm>
    </>
  );
});

Form.displayName = 'MessageForm';
