import { useRef, useState } from 'react';

import { createMessage, createPrivateRoom } from 'store/actions';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectRooms } from 'store/selectors';

import { NEW_ROOM } from 'utils/constants';
import { useTyping } from './useTyping';

export const useMessageForm = () => {
  const dispatch = useAppDispatch();

  const { selected } = useAppSelector(selectRooms);
  const isNewRoom = selected === NEW_ROOM;

  const { clearTyping, onPress } = useTyping(isNewRoom);

  const [message, setMessage] = useState('');

  const typingTimeoutId = useRef<NodeJS.Timeout | undefined>();

  const onChangeHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    onPress();
    setMessage(e.target.value);
  };

  const onSubmitMessage = () => {
    if (!selected) {
      return;
    }

    const data = { message: message.trim() };

    if (isNewRoom) dispatch(createPrivateRoom(data));
    else createMessage(selected, data);

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
