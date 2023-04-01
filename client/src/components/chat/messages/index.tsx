import dayjs from 'dayjs';
import React, { FC, Fragment, MouseEvent, useCallback } from 'react';

import { Message } from './message';

import { Empty } from 'styles';

import { download, getDay } from 'utils/message';
import { useAppSelector } from 'store/hooks';
import { getChatData } from 'store/selectors';

export const Messages: FC<{}> = () => {
  const { messages, typingText } = useAppSelector(getChatData);

  const downloadHandler = useCallback(
    ({ currentTarget }: MouseEvent) => {
      const id = currentTarget.getAttribute('data-id');

      if (id) download(id);
    },
    []
  );

  return (
    <div className='messages' id='messages'>
      {messages.map((message, index) => {
        const { authorId, createdAt, id } = message;

        const nextMessage = messages[index + 1];
        const prevMessage = messages[index - 1];

        const isLast = nextMessage?.authorId !== authorId;
        const isNewDay =
          index === 0 || getDay(prevMessage?.createdAt) !== getDay(createdAt);

        return (
          <Fragment key={id}>
            {isNewDay && (
              <Empty margin='15px'>{dayjs(createdAt).format('DD MMMM')}</Empty>
            )}
            <Message {...message} isLast={isLast} download={downloadHandler} />
          </Fragment>
        );
      })}

      <div className='typing'>{typingText}</div>
    </div>
  );
};
