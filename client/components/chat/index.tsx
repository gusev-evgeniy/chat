import React, { FC } from 'react';

import { StyledChat } from './styled';

import { MessageForm } from './messageForm';
import { Header } from '../header';
import { useChat } from './useChat';
import { Messages } from './messages';

export const Chat: FC<{}> = () => {
  const { listenToScroll, typingText, messages, selected } = useChat();

  return (
    <StyledChat>
      <Header />

      <div className='messages_wrapper' onScroll={listenToScroll}>
        <div className='messages'>
          <Messages messages={messages} />
          <div className='typing'>{typingText}</div>
        </div>
      </div>

      <MessageForm selected={selected as string} />
    </StyledChat>
  );
};
