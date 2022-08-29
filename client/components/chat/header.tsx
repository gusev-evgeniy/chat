import Image from 'next/image';
import React, { FC, memo, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import arrow_back from '../../images/arrow_back.svg';
import { useAppSelector } from '../../store/hooks';
import { getHeaderInfo } from '../../store/selectors';
import { openCreateRoom } from '../../store/slices/createRoom';
import { openDialog } from '../../store/slices/dialog';
import { StyledChatHeader, StyledGroupSubstring, StyledSubstring } from './styled';

export const Header: FC<{}> = memo(() => {
  const dispatch = useDispatch();

  const data = useAppSelector(getHeaderInfo);

  if (!data) {
    return null;
  }

  const { isNewRoom, online, substring, title, type } = data;

  const onBackHandler = () => {
    dispatch(openCreateRoom(true));
  };

  const openDialogHandler = () => {
    dispatch(openDialog('GROUP_INFO'));
  };

  return (
    <StyledChatHeader>
      {isNewRoom && (
        <span className='arrow' onClick={onBackHandler}>
          <Image width='30px' height='30px' src={arrow_back} alt='arrow_back' />
        </span>
      )}

      <div>
        <p className='title'>{title}</p>
        { online 
          ? <p className='online'>online</p> 
          : type === 'private' 
            ? <StyledSubstring>{substring}</StyledSubstring> 
            : <StyledGroupSubstring onClick={openDialogHandler}>{substring}</StyledGroupSubstring> }
      </div>
    </StyledChatHeader>
  );
});

Header.displayName = 'Header';
