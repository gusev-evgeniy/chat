import { useEffect, useMemo, useRef, useState } from 'react';

import { sendTyping } from 'store/actions';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectRooms } from 'store/selectors';

export const useTyping = () => {
  const dispatch = useAppDispatch();

  const { selected, data } = useAppSelector(selectRooms);
  const [typing, setTyping] = useState<boolean | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (typing === null) {
      return;
    }

    dispatch(sendTyping(typing));
  }, [typing, dispatch]);

  const onPress = () => {
    // const isNewRoom = !data.some(({ id }) => id === selected);

    if (selected === 'NEW_ROOM') {
      return;
    }

    setTyping(true);
    clearInterval(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
    }, 3000);
  };

  const clearTyping = () => setTyping(prev => (prev === null ? null : false));

  return {
    onPress,
    clearTyping,
  }
};
