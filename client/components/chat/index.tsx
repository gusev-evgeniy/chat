import React, { FC, Fragment, useMemo } from 'react';
import Image from 'next/image';

import { ChatItem } from './item';
import { StyledChat } from './styled';

import arrow_back from '../../images/arrow_back.svg';
import { RoomsState } from '../../store/slices/rooms';

import { Empty } from '../../styles';
import { useAppSelector } from '../../store/hooks';
import { selectMyData } from '../../store/slices/user';
import { selectMessagesData } from '../../store/slices/messages';
import dayjs from 'dayjs';
import { MessageForm } from './messageForm';
import { returnTypingText } from '../../utils/message';
import { Header } from './header';
import { UserBD } from '../../type/user';
import { CreateRoomState } from '../../store/slices/createRoom';

type Props = {
  selected: RoomsState['selected'];
  typing: string[];
};

export const Chat: FC<Props> = ({ selected, typing }) => {
  const me = useAppSelector(selectMyData);
  const messages = useAppSelector(selectMessagesData);

  const typingText = useMemo(() => returnTypingText(typing, selected?.type), [typing, selected?.type]);

  // useEffect(() => {
  //   const messages = document.querySelector('.messages');

  //   if (messages) {
  //     window.scrollTo(0, messages.scrollHeight);
  //   }

  // }, [messages.length]);

  if (!selected) {
    return (
      <StyledChat empty={true}>
        <Empty>Сhoose who you would like to write to</Empty>
      </StyledChat>
    );
  }
  console.log('selected', selected);

  const online =
    selected.type === 'private'
      ? !!selected.participants.find(participant => participant.id !== me?.id)?.online
      : false;
  console.log('selected.participants', selected.participants)
  const substring =
    selected.type === 'private'
      ? ( dayjs(selected.participants.find(participant => participant.id !== me?.id)?.wasOnline as string).format('YYYY-MM-DD'))
      : `${selected.participants.length} участников, ${selected.participants.filter(
          ({ online }) => online
        ).length} в сети`;

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

            const isMy = message.author.id === me?.id;
            const isLast = messages[index + 1]?.author.id !== message.author.id;
            const isNewDay = getDay(messages[index - 1]?.createdAt) !== getDay(message.createdAt);

            return (
              <Fragment key={message.id}>
                {isNewDay && <Empty margin='15px'>{dayjs(message.createdAt).format('DD MMMM')}</Empty>}
                <ChatItem {...message} isMy={isMy} isLast={isLast} />
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
