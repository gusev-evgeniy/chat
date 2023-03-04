import React, { FC } from 'react';

import { StyledChat } from './styles';

import { Form } from './form';
import { Header } from '../header';
import { useChat } from './useChat';
import { Messages } from './messages';
import { useAppSelector } from 'store/hooks';
import { getChatData } from 'store/selectors';

export const Chat: FC<{}> = () => {
  const { listenToScroll } = useChat();

  const {
    messages,
    selected,
    typingText,
  } = useAppSelector(getChatData);

  return (
    <StyledChat>
      <Header />

      <div className='messages_wrapper' onScroll={listenToScroll}>
        <div className='messages'>
          <Messages messages={messages} />
          <div className='typing'>{typingText}</div>
        </div>
      </div>

      <Form selected={selected as string} />
    </StyledChat>
  );
};
