import React, { FC, memo, MouseEventHandler } from 'react';
import { Message } from 'types/messages';
import Image from 'next/image';

import fileIcon from 'images/file.svg';
import { MessageIcon, StyledAttachment } from '../styles';

type Props = {
  download: MouseEventHandler;
  attachment: Message['attachment'];
};

export const Attachment: FC<Props> = memo(({ attachment, download }) => {
  if (!attachment) {
    return null;
  }

  const { id, name, size } = attachment;

  return (
    <StyledAttachment data-id={id} onClick={download}>
      <MessageIcon>
        <Image width='18px' height='18px' src={fileIcon} alt='file' />
      </MessageIcon>
      <div className='file_info'>
        <div className='name'>{name}</div>
        <div className='size'>{size}</div>
      </div>
    </StyledAttachment>
  );
});

Attachment.displayName = 'Attachment';
