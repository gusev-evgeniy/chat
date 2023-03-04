import React, { FC, memo } from 'react';
import { Message } from 'types/messages';
import Image from 'next/image';

import fileIcon from 'images/file.svg';
import { StyledAttachment } from '../styles';

type Props = {
  download: (e: React.MouseEvent<HTMLDivElement>) => void;
  attachment: Message['attachment'];
};

export const Attachment: FC<Props> = memo(({ attachment, download }) => {
  if (!attachment) {
    return null;
  }

  const { id, name, size } = attachment;

  return (
    <StyledAttachment data-id={id} onClick={download}>
      <div className='icon'>
        <Image width='18px' height='18px' src={fileIcon} alt='file' />
      </div>
      <div className='file_info'>
        <div className='name'>{name}</div>
        <div className='size'>{size}</div>
      </div>
    </StyledAttachment>
  );
});

Attachment.displayName = 'Attachment';
