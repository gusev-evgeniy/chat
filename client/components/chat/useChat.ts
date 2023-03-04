import { useEffect, useInsertionEffect, useMemo } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getChatData } from 'store/selectors';
import { readMessage } from 'store/actions';
import { getMessages } from 'store/actions/messages';

export const useChat = () => {
  const {
    messages,
    selected,
    typingText,
    unreadedMessagesCount,
    loaded = false,
    count,
  } = useAppSelector(getChatData);

  const dispatch = useAppDispatch();

  useInsertionEffect(() => {
    !loaded && dispatch(getMessages());
  }, [loaded, dispatch]);

  useEffect(() => {
    if (!selected || !loaded || !unreadedMessagesCount) {
      return;
    }

    dispatch(readMessage(selected));
  }, [selected, loaded, unreadedMessagesCount, dispatch]);

  const listenToScroll = useDebouncedCallback(() => {
    const messages_wrapper = document.querySelector('.messages_wrapper');

    if (!messages_wrapper) {
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = messages_wrapper;
    const scrolled = Math.ceil(
      (-scrollTop / (scrollHeight - clientHeight)) * 100
    );

    if (scrolled >= 0 && messages.length < count) {
      dispatch(getMessages(messages.length));
    }
  }, 300);

  return useMemo(
    () => ({
      listenToScroll,
      typingText,
      messages,
      selected
    }),
    []
  );
};
