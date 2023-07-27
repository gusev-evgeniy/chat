import React, { FC, memo, MouseEventHandler } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';

import readedIcon from 'images/readed.svg';
import unreadedIcon from 'images/unreaded.svg';

import { Message as MessageType } from '@/types/messages';

import { StyledChatItem, StyledSystemMessage, SystemMessageWrapper } from '../styles';
import { Avatar } from '@/components/avatar';
import { Attachment } from './attachment';
import { Audio } from './audioPlayer';

type Props = MessageType & {
  isMy?: boolean;
  isLast: boolean;
  download: MouseEventHandler;
};

export const Message: FC<Props> = memo(
  ({
    isMy,
    text,
    createdAt,
    readed,
    isLast,
    author,
    id,
    isSystem,
    attachment,
    download,
    media,
  }) => {
    const time = dayjs(createdAt).format('HH:mm');

    if (isSystem) {
      return (
        <SystemMessageWrapper>
          {media && <Avatar name='' photo={media} size={70} gradient=''/>}
          <StyledSystemMessage>
            <span className='text'>{text}</span>
          </StyledSystemMessage>
        </SystemMessageWrapper>
      );
    }

    return (
      <StyledChatItem my={isMy} isLast={isLast} data-id={id}>
        <div className='item'>
          <div className='message'>{text}</div>

          <Audio media={media} id={id} />
          <Attachment attachment={attachment} download={download} />
          <span className='time'>{time}</span>

          {isMy && (
            <div className='readed_icon'>
              <Image
                width='18px'
                height='18px'
                src={readed ? readedIcon : unreadedIcon}
                alt='search'
              />
            </div>
          )}
        </div>

        {isLast && !!author && (
          <Avatar name={author.name} photo={author.photo} size={40} gradient={author.background}/>
        )}
      </StyledChatItem>
    );
  }
);

Message.displayName = 'Message';
