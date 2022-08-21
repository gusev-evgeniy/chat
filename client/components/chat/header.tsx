import Image from 'next/image';
import React, { FC, memo } from 'react';

import arrow_back from '../../images/arrow_back.svg';

type Props = {
  isNewRoom: boolean;
  title: string;
  online: boolean;
  substring: string;
}

export const Header: FC<Props> = memo(({ isNewRoom, title, online, substring }) => {
  return (
    <div className='header'>
      {isNewRoom && (
        <span className='arrow'>
          <Image width='30px' height='30px' src={arrow_back} alt='arrow_back' />
        </span>
      )}

      <div>
        <p className='title'>{title}</p>
        {online ? <p className='online'>online</p> : <p className='substring'>{substring}</p>}
      </div>
    </div>
  );
});

Header.displayName = 'Header';
