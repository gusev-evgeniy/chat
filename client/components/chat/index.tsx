import React, { FC, Fragment, useEffect } from 'react';
import dayjs from 'dayjs';

import { ChatItem } from './item';
import { StyledChat } from './styled';


import { Empty } from '../../styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { MessageForm } from './messageForm';
import { Header } from './header';
import { getChatData } from '../../store/selectors';
import { readMessage } from '../../store/actions';

export const Chat: FC<{}> = () => {
  const { messages, selected, typingText, unreadedMessagesCount } = useAppSelector(getChatData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selected || !unreadedMessagesCount) {
      return;
    }

    dispatch(readMessage(selected))
  }, [selected, unreadedMessagesCount, dispatch]);

  return (
    <StyledChat>
      <Header />

      <div className='messages_wrapper'>
        <div className='messages'>
          {messages.map((message, index) => {
            const getDay = (createdAt: string) => dayjs(createdAt).format('YYYY-MM-DD');
            const isLast = messages[index + 1]?.author.id !== message.author.id;
            const isNewDay = getDay(messages[index - 1]?.createdAt) !== getDay(message.createdAt);

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
