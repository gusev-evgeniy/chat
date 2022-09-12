import React, { FC, Fragment, useEffect, useInsertionEffect } from 'react';
import dayjs from 'dayjs';
import { useDebouncedCallback } from 'use-debounce';

import { ChatItem } from './item';
import { StyledChat } from './styled';

import { Empty } from '../../styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { MessageForm } from './messageForm';
import { Header } from '../header';
import { getChatData } from '../../store/selectors';
import { readMessage } from '../../store/actions';
import { getMessages } from '../../store/actions/messages';

export const Chat: FC<{}> = () => {
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
    const scrolled = Math.ceil((-scrollTop / (scrollHeight - clientHeight)) * 100);

    if (scrolled >= 80 && messages.length < count) {
      console.log('here')
      dispatch(getMessages(messages.length))
    }
  }, 300);

  return (
    <StyledChat>
      <Header />

      <div className='messages_wrapper' onScroll={listenToScroll}>
        <div className='messages'>
          {messages.map((message, index) => {
            const getDay = (createdAt: string) => dayjs(createdAt).format('YYYY-MM-DD');
            const isLast = messages[index + 1]?.authorId !== message.authorId;
            const isNewDay =
              index === 0 || getDay(messages[index - 1]?.createdAt) !== getDay(message.createdAt);

            return (
              <Fragment key={message.id}>
                {isNewDay && <Empty margin='15px'>{dayjs(message.createdAt).format('DD MMMM')}</Empty>}
                <ChatItem {...message} isLast={isLast} />
              </Fragment>
            );
          })}
          <div className='typing'>{typingText}</div>
        </div>
      </div>

      <MessageForm selected={selected as string} />
    </StyledChat>
  );
};
