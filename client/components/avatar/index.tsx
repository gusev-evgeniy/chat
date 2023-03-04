import React, { FC, memo } from 'react';

import { AvaWrapper, Online, StyledAva } from './styles';

type Props = {
  photo: string | null;
  name: string;
  size: number;
  online?: boolean;
};

export const Avatar: FC<Props> = memo(({ photo, name = '', size, online = false }) => {
  console.log(!photo && name.substring(0, 2).toUpperCase())

  return (
    <AvaWrapper size={size} className="avatar">
      <StyledAva backgroundImage={photo} size={size}>
        <span>{!photo && name.substring(0, 2).toUpperCase()}</span>
      </StyledAva>
      {online && <Online />}
    </AvaWrapper>
  );
});

Avatar.displayName = 'Avatar';
