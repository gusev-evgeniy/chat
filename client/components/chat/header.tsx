import Image from 'next/image';
import React, { FC, memo } from 'react';
import { useDispatch } from 'react-redux';

import arrow_back from '../../images/arrow_back.svg';
import { openCreateRoom } from '../../store/slices/createRoom';
import { StyledChatHeader } from './styled';

type Props = {
  isNewRoom: boolean;
  title: string;
  online: boolean;
  substring: string;
}

export const Header: FC<Props> = memo(({ isNewRoom, title, online, substring }) => {
  const dispatch = useDispatch();

  const onBackHandler = () => {
    dispatch(openCreateRoom(true))
  }

  return (
    <StyledChatHeader>
      {isNewRoom && (
        <span className='arrow' onClick={onBackHandler}>
          <Image width='30px' height='30px' src={arrow_back} alt='arrow_back' />
        </span>
      )}

      <div>
        <p className='title'>{title}</p>
        {online ? <p className='online'>online</p> : <p className='substring'>{substring}</p>}
      </div>
    </StyledChatHeader>
  );
});

Header.displayName = 'Header';
