import { useEffect, useRef, useState } from 'react';

import { sendTyping } from 'store/actions';
import { useAppDispatch } from 'store/hooks';

export const useTyping = () => {
  const dispatch = useAppDispatch();

  const [typing, setTyping] = useState<boolean | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (typing === null) {
      return;
    }

    dispatch(sendTyping(typing));
  }, [typing, dispatch]);

  const onPress = () => {
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
