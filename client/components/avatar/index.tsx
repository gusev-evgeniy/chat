import React, { FC } from 'react';
import { AvaWrapper, Online, StyledAva } from './styles';

type Props = {
  photo: string | null;
  name: string;
  size: number;
  online: boolean;
};

export const Avatar: FC<Props> = ({ photo, name, size, online }) => {
  return (
    <AvaWrapper size={size}>
      <StyledAva title='Add photo' backgroundImage={photo} size={size}>
        <span>{!photo && name.substring(0, 2).toUpperCase()}</span>
      </StyledAva>
      {online && <Online />}
    </AvaWrapper>
  );
};
