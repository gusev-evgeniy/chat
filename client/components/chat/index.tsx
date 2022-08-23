import React, { FC, Fragment, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { ChatItem } from './item';
import { StyledChat } from './styled';

import { setUnreadedCount, RoomsState } from '../../store/slices/rooms';

import { Empty } from '../../styles';
import { useAppSelector } from '../../store/hooks';
import { selectMyData } from '../../store/slices/user';
import { readMessages, selectMessagesData, setAllReadedMessages } from '../../store/slices/messages';
import dayjs from 'dayjs';
import { MessageForm } from './messageForm';
import { returnTypingText } from '../../utils/message';
import { Header } from './header';
import { socket } from '../../api/socket';
import { EVENTS } from '../../utils/constants';

type Props = {
  selected: RoomsState['selected'];
  typing: string[];
};

export const Chat: FC<Props> = ({ selected, typing }) => {
  const me = useAppSelector(selectMyData);
  const messages = useAppSelector(selectMessagesData);

  const dispatch = useDispatch();

  const typingText = useMemo(() => returnTypingText(typing, selected?.type), [typing, selected?.type]);
  useEffect(() => {
    if (!selected || !selected?.unreadedMessagesCount) {
      return;
    }
    console.log(2)
    socket.emit(EVENTS.MESSAGE.READ, { roomId: selected.id }, () => {
      dispatch(setUnreadedCount({ roomId: selected.id as string, count: 0 }));
      dispatch(setAllReadedMessages());
    });
  }, [selected]);

  if (!selected) {
    return (
      <StyledChat empty={true}>
        <Empty>Сhoose who you would like to write to</Empty>
      </StyledChat>
    );
  }

  const online =
    selected.type === 'private'
      ? !!selected.participants.find(participant => participant.id !== me?.id)?.online
      : false;

  const substring =
    selected.type === 'private'
      ? dayjs(
          selected.participants.find(participant => participant.id !== me?.id)?.wasOnline as string
        ).format('YYYY-MM-DD')
      : `${selected.participants.length} участников, ${
          selected.participants.filter(({ online }) => online).length
        } в сети`;

  const title =
    selected.type === 'private'
      ? (selected.participants.find(participant => participant.id !== me?.id)?.name as string)
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
