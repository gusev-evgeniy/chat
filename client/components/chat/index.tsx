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
import { Typing } from '../../type/messages';
import { returnTypingText } from '../../utils/message';

type Props = {
  selected: RoomsState['selected'];
  typing: Typing;
};

export const Chat: FC<Props> = ({ selected, typing }) => {
  const me = useAppSelector(selectMyData);
  const messages = useAppSelector(selectMessagesData);

  const typingText = useMemo(() => returnTypingText(typing, selected?.type), [typing, selected?.type])

  if (!selected) {
    return (
      <StyledChat>
        <Empty>Сhoose who you would like to write to</Empty>
      </StyledChat>
    );
  }

  const isNewRoom = selected.roomId === null;

  return (
    <StyledChat>
      <div className='header'>
        {isNewRoom && (
          <span className='arrow'>
            <Image width='30px' height='30px' src={arrow_back} alt='arrow_back' />
          </span>
        )}
        <div>
          <p className='title'>{selected.name}</p>
          {/* <p className='time'>{  }</p> */}
        </div>
      </div>

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
