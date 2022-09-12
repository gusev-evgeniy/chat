import Image from 'next/image';
import React, { FC, memo } from 'react';

import menu from '../../images/menu.svg';
import call_icon from '../../images/call.svg';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getHeaderInfo } from '../../store/selectors';
import { openDialog } from '../../store/slices/dialog';
import { StyledIconButton } from '../../styles';
import { StyledChatHeader, StyledGroupSubstring, StyledSubstring } from '../chat/styled';
import { call } from '../../store/actions/call';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { WIDTH } from '../../styles/variables';
import { openSideMenu } from '../../store/slices/sideMenu';
import { SideMenuIcon } from '../sideMenu/icon';

export const Header: FC<{}> = memo(() => {
  const dispatch = useAppDispatch();

  const matches = useMediaQuery(`(max-width: ${WIDTH.MEDIUM})`);

  const { online, substring, title, type, myId, userId, selected, isNewRoom } =
    useAppSelector(getHeaderInfo) || {};

  const openDialogHandler = () => {
    dispatch(openDialog('GROUP_INFO'));
  };

  const onCallHandler = () => {
    dispatch(call());
  };

  return (
    <StyledChatHeader>
      {matches && (
        <SideMenuIcon />
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
