import Image from 'next/image';
import React, { FC, memo } from 'react';
import { StyledChangeAva } from './styles';

import add_photo from '../../images/add_photo.svg';

type Props = {
  photo: string | null;
  name: string;
  size: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AvatarInput: FC<Props> = memo(({ photo, name, onChange, size }) => {
  return (
    <StyledChangeAva title='Add photo' backgroundImage={photo} size={size}>
      <label className='upload' htmlFor='inputTag'>
        <Image width='30px' height='30px' src={add_photo} alt='add_photo' />
        <input id='inputTag' type='file' onChange={onChange} hidden />
      </label>
      <span>{!photo && name.substring(0, 2).toUpperCase()}</span>
    </StyledChangeAva>
  );
});

AvatarInput.displayName = 'AvaterInput';
