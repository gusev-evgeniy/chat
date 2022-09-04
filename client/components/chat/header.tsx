import Image from 'next/image';
import React, { FC, memo } from 'react';

import arrow_back from '../../images/arrow_back.svg';
import call_icon from '../../images/call.svg';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getHeaderInfo } from '../../store/selectors';
import { openCreateRoom } from '../../store/slices/createRoom';
import { openDialog } from '../../store/slices/dialog';
import { StyledIconButton } from '../../styles';
import { StyledChatHeader, StyledGroupSubstring, StyledSubstring } from './styled';
import { call } from '../../store/actions/call';

export const Header: FC<{}> = memo(() => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(getHeaderInfo);

  if (!data) {
    return null;
  }

  const { isNewRoom, online, substring, title, type, myId, userId, selected } = data;

  const onBackHandler = () => {
    dispatch(openCreateRoom(true));
  };

  const openDialogHandler = () => {
    dispatch(openDialog('GROUP_INFO'));
  };

  const onCallHandler = () => {
    dispatch(call());
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
        {online ? (
          <p className='online'>online</p>
        ) : type === 'private' ? (
          <StyledSubstring>{substring}</StyledSubstring>
        ) : (
          <StyledGroupSubstring onClick={openDialogHandler}>{substring}</StyledGroupSubstring>
        )}
      </div>

      <div className='icons'>
        {!isNewRoom && type === 'private' && (
          <StyledIconButton onClick={onCallHandler}>
            <Image width='30px' height='30px' src={call_icon} alt='call' />
          </StyledIconButton>
        )}
      </div>
    </StyledChatHeader>
  );
});

Header.displayName = 'Header';
