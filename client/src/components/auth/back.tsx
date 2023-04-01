import React from 'react';
import Image from 'next/image';

import arrow_back from 'images/arrow_back.svg';

import { BackButon } from './styles';

export const Back = () => {
  return (
    <BackButon>
      <Image width='30px' height='30px' src={arrow_back} alt='back' />
    </BackButon>
  );
};
