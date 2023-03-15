import { useRef, useState } from 'react';

import { createMessageOrPrivateRoom } from 'store/actions/messages';
import { useAppDispatch } from 'store/hooks';

import { useTyping } from './useTyping';

export const useMessageForm = () => {
  const dispatch = useAppDispatch();

  const { clearTyping, onPress } = useTyping();

  const [message, setMessage] = useState('');

  const typingTimeoutId = useRef<NodeJS.Timeout | undefined>();

  const onChangeHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    onPress();
    setMessage(e.target.value);
  };

  const onSubmitMessage = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const data = { message: message.trim() };

    dispatch(createMessageOrPrivateRoom(data))

    setMessage('');
    clearInterval(typingTimeoutId.current);
    clearTyping();
  };

  return {
    onSubmitMessage,
    onChangeHandler,
    message,
  };
};
