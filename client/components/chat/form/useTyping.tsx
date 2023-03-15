import { useEffect, useRef, useState } from 'react';

import { sendTyping } from 'store/actions';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectRooms } from 'store/selectors';
import { NEW_ROOM } from 'utils/constants';

export const useTyping = () => {
  const dispatch = useAppDispatch();

  const { selected } = useAppSelector(selectRooms);
  const isNewRoom = selected === NEW_ROOM;

  const [typing, setTyping] = useState<boolean | null>(null);

  const typingTimeoutId = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (isNewRoom || typing === null) {
      return;
    }

    dispatch(sendTyping(typing));
  }, [typing, isNewRoom, dispatch]);

  const onPress = () => {
    setTyping(true);
    clearInterval(typingTimeoutId.current);

    typingTimeoutId.current = setTimeout(() => {
      setTyping(false);
    }, 3000);
  };

  const clearTyping = () => setTyping(false);

  return {
    onPress,
    clearTyping,
  };
};
