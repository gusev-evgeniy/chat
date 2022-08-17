import React, { FC, Fragment } from 'react';
import Image from 'next/image';

import { ChatItem } from './item';
import { StyledChat } from './styled';

import arrow_back from '../../images/arrow_back.svg';
import { RoomsState } from '../../store/slices/rooms';

import { Empty } from '../../styles';
import { useAppSelector } from '../../store/hooks';
import { selectMyData } from '../../store/slices/user';
import { selectMessages } from '../../store/slices/messages';
import dayjs from 'dayjs';
import { MessageForm } from './messageForm';

type Props = {
  selected: RoomsState['selected'];
  typing: object[];
};

export const Chat: FC<Props> = ({ selected, typing }) => {
  const me = useAppSelector(selectMyData);
  const { data } = useAppSelector(selectMessages);

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
          {data.map((message, index) => {
            const getDay = (createdAt: string) => dayjs(createdAt).format('YYYY-MM-DD');

            const isMy = message.author.id === me?.id;
            const isLast = data[index + 1]?.author.id !== message.author.id;
            const isNewDay = getDay(data[index - 1]?.createdAt) !== getDay(message.createdAt);

            return (
              <Fragment key={message.id}>
                {isNewDay && <Empty margin='15px'>{dayjs(message.createdAt).format('DD MMMM')}</Empty>}
                <ChatItem {...message} isMy={isMy} isLast={isLast} />
              </Fragment>
            );
          })}
          <div className='typing'>{!!typing.length ? `${me?.name} печатает...` : ''}</div>
        </div>
      </div>

      <MessageForm selected={selected} />
    </StyledChat>
  );
};
