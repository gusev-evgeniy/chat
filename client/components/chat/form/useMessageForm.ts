import { useRef } from 'react';
import { updateDraft } from 'store/actions/draft';

import { createMessageOrPrivateRoom } from 'store/actions/room';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getDraft } from 'store/selectors';
import { useEmoji } from './useEmoji';

import { useTyping } from './useTyping';

export const useMessageForm = () => {
  const dispatch = useAppDispatch();

  const { clearTyping, onPress } = useTyping();
  const emoji = useEmoji();
  
  const message = useAppSelector(getDraft) || '';

  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>();

  const onChangeHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    onPress();
    dispatch(updateDraft(e.target.value));
  };

  const scrollToNewMessage = () => {
    const container = document.getElementById('messages');

    if (container) container.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmitMessage = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const data = { message: message.trim() };

    dispatch(createMessageOrPrivateRoom(data));
    emoji.closeEmoji();
    dispatch(updateDraft(''));
    clearInterval(typingTimeoutRef.current);
    clearTyping();
    scrollToNewMessage();
  };

  return {
    ...emoji,
    onSubmitMessage,
    onChangeHandler,
    message,
  };
};
