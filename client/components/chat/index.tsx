import React, { FC, useState } from 'react';

import { StyledChat } from './styles';

import { Form } from './form';
import { Header } from '../header';
import { useChat } from './useChat';
import { Messages } from './messages';
import { useAppSelector } from 'store/hooks';
import { getChatData } from 'store/selectors';
import { DraggingArea } from './draggingArea';
import { useMessageForm } from './form/useMessageForm';

export const Chat: FC<{}> = () => {
  const { listenToScroll } = useChat();

  const [drag, setDrag] = useState(false);

  const { messages, selected, typingText } = useAppSelector(getChatData);
  const { uploadFile } = useMessageForm(selected as string);

  const onDragOverHandler = () => {
    setDrag(true);
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    uploadFile(file);
    setDrag(false);
  };

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
        <div className='messages'>
          <Messages messages={messages} />
          <div className='typing'>{typingText}</div>
        </div>
      </div>

      <Form selected={selected as string} />
    </StyledChat>
  );
};
