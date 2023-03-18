import { useRef, useState } from 'react';

import { createMessageOrPrivateRoom } from 'store/actions/messages';
import { useAppDispatch } from 'store/hooks';

import { useTyping } from './useTyping';

export const useMessageForm = () => {
  const dispatch = useAppDispatch();

  const { clearTyping, onPress } = useTyping();

  const [message, setMessage] = useState('');

  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>();

  const onChangeHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    onPress();
    setMessage(e.target.value);
  };

  const scrollToNewMessage = () => {
    const container = document.getElementById('messages');

    if (container) container.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmitMessage = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const data = { message: message.trim() };

    dispatch(createMessageOrPrivateRoom(data));

    setMessage('');
    clearInterval(typingTimeoutRef.current);
    clearTyping();
    scrollToNewMessage();
  };

  return {
    onSubmitMessage,
    onChangeHandler,
    message,
  };
};
