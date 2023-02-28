import { useEffect, useMemo, useRef, useState } from 'react';

import { createMessage, createPrivateRoom, sendTyping } from 'store/actions';
import { useAppDispatch } from 'store/hooks';

import { NEW_ROOM } from 'utils/constants';

export const useMessageForm = (selected: string) => {
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState<boolean | null>(null);

  const typingTimeoutId = useRef<NodeJS.Timeout | undefined>();

  const isNewRoom = selected === NEW_ROOM;

  useEffect(() => {
    if (isNewRoom || typing === null) {
      return;
    }

    dispatch(sendTyping(typing));
  }, [typing, isNewRoom, dispatch]);

  const onChangeHandler = ({
    target,
  }: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setTyping(true);
    clearInterval(typingTimeoutId.current);

    typingTimeoutId.current = setTimeout(() => {
      setTyping(false);
    }, 3000);

    setMessage(target.value);
  };

  const onSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNewRoom) dispatch(createPrivateRoom(message.trim()));
    else createMessage(selected, message.trim());

    setMessage('');
    clearInterval(typingTimeoutId.current);
    setTyping(false);
  };

  return useMemo(
    () => ({
      onSubmitMessage,
      onChangeHandler,
      message,
    }),
    [message]
  );
};
