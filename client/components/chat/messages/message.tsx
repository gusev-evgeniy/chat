import React, { FC, memo } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';

import readedIcon from 'images/readed.svg';
import unreadedIcon from 'images/unreaded.svg';
import fileIcon from 'images/file.svg';

import { Message as MessageType } from 'types/messages';

import { StyledChatItem, StyledSystemMessage } from '../styles';
import { StyledAva } from 'components/avatar/styles';

type Props = MessageType & { isMy?: boolean; isLast: boolean };

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
  }) => {
    const { photo } = author || {};

    const time = dayjs(createdAt).format('HH:mm');

    if (isSystem) {
      return <StyledSystemMessage>{text}</StyledSystemMessage>;
    }

    return (
      <StyledChatItem my={isMy} isLast={isLast} data-id={id}>
        <div className='item'>
          <div className='message'>{text}</div>

          {attachment && (
            <div className='attachment'>
              <div className='icon'>
                <Image width='18px' height='18px' src={fileIcon} alt='file' />
              </div>
              <div className='file_info'>
                <div className='name'>{attachment.name}</div>
                <div className='size'>{attachment.size}</div>
              </div>
            </div>
          )}

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

        {isLast && (
          <StyledAva size={35} backgroundImage={photo ? photo : undefined} />
        )}
      </StyledChatItem>
    );
  }
);

Message.displayName = 'Message';
