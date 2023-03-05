import React, { FC } from 'react';

import { useAppSelector } from 'store/hooks';
import { getChatData } from 'store/selectors';

import { Form } from './form';
import { Header } from '../header';
import { useChat } from './useChat';
import { Messages } from './messages';
import { DraggingArea } from './dragArea';
import { useDragArea } from './dragArea/useDragArea';

import { StyledChat } from './styles';

export const Chat: FC<{}> = () => {
  const { listenToScroll } = useChat();

  const {
    dragLeaveHandler,
    dragStartHandler,
    dropHandler,
    onDragOverHandler,
    drag,
  } = useDragArea();

  return (
    <StyledChat>
      <Header />

      <div
        className='messages_wrapper'
        onDragOver={onDragOverHandler}
        onDragLeave={dragLeaveHandler}
        onScroll={listenToScroll}>
        {drag && (
          <DraggingArea
            dropHandler={dropHandler}
            dragStartHandler={dragStartHandler}
            dragLeaveHandler={dragLeaveHandler}
          />
        )}

        <Messages />
      </div>

      <Form />
    </StyledChat>
  );
};
