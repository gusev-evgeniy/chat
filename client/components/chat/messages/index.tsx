import dayjs from 'dayjs';
import React, { FC, Fragment } from 'react';

import { Message } from './message';

import { Empty } from 'styles';

import { Message as MessageType } from 'types/messages';
import { download } from 'utils/message';

type Props = {
  messages: MessageType[];
};

export const Messages: FC<Props> = ({ messages }) => {
  const downloadHandler = async ({
    currentTarget,
  }: React.MouseEvent<HTMLDivElement>) => {
    const id = currentTarget.getAttribute('data-id');

    if (id) download(id);
  };

  return (
    <>
      {messages.map((message, index) => {
        const getDay = (createdAt: string) =>
          dayjs(createdAt).format('YYYY-MM-DD');
        const isLast = messages[index + 1]?.authorId !== message.authorId;
        const isNewDay =
          index === 0 ||
          getDay(messages[index - 1]?.createdAt) !== getDay(message.createdAt);

        return (
          <Fragment key={message.id}>
            {isNewDay && (
              <Empty margin='15px'>
                {dayjs(message.createdAt).format('DD MMMM')}
              </Empty>
            )}
            <Message {...message} isLast={isLast} download={downloadHandler} />
          </Fragment>
        );
      })}
    </>
  );
};
