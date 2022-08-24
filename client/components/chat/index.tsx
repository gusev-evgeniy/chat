import React, { FC, Fragment, memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import { ChatItem } from './item';
import { StyledChat } from './styled';

import { setUnreadedCount } from '../../store/slices/rooms';

import { Empty } from '../../styles';
import { useAppSelector } from '../../store/hooks';
import { setAllReadedMessages } from '../../store/slices/messages';
import { MessageForm } from './messageForm';
import { Header } from './header';
import { socket } from '../../api/socket';
import { EVENTS } from '../../utils/constants';
import { getChatData } from '../../store/selectors';

export const Chat: FC<{}> = () => {
  const { messages, selected, myId, typingText } = useAppSelector(getChatData);
  const { id, unreadedMessagesCount } = selected || {}

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id || !unreadedMessagesCount) {
      return;
    }

    socket.emit(EVENTS.MESSAGE.READ, { roomId: id }, () => {
      dispatch(setUnreadedCount({ roomId: id, count: 0 }));
      dispatch(setAllReadedMessages());
    });
  }, [id, unreadedMessagesCount]);

  if (!selected) {
    return null;
  }

  const { type, participants } = selected;

  const online =
    type === 'private'
      ? !!participants.find(participant => participant.id !== myId)?.online
      : false;

  const substring =
    type === 'private'
      ? dayjs(
          participants.find(participant => participant.id !== myId)?.wasOnline as string
        ).format('YYYY-MM-DD')
      : `${participants.length} участников, ${
          participants.filter(({ online }) => online).length
        } в сети`;

  const title =
    type === 'private'
      ? (participants.find(participant => participant.id !== myId)?.name as string)
      : (selected.title as string);

  return (
    <StyledChat>
      <Header isNewRoom={selected.id === null} online={online} substring={substring} title={title} />

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

      <MessageForm selected={selected} />
    </StyledChat>
  );
};
