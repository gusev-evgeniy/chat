import Image from 'next/image';
import React, { FC, memo } from 'react';

import call_icon from '../../images/call.svg';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getHeaderInfo } from '../../store/selectors';
import { StyledIconButton } from '../../styles';
import { StyledChatHeader } from '../chat/styled';
import { call } from '../../store/actions/call';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { WIDTH } from '../../styles/variables';
import { SideMenuIcon } from '../sideMenu/icon';
import { UserInfo } from './userInfo';
import { useCall } from '../providers/callProvider';
import { openDialog } from '../../store/slices/dialog';

export const Header: FC<{}> = memo(() => {
  const dispatch = useAppDispatch();
  const matches = useMediaQuery(`(max-width: ${WIDTH.MEDIUM})`);
  const { callUser } = useCall();
  const { title, type, isNewRoom, privateUser } = useAppSelector(getHeaderInfo) || {};

  const onCallHandler = () => {
    dispatch(openDialog('CALL'));
    if (privateUser?.id) callUser(privateUser.id)
  };

  return (
    <StyledChatHeader>
      {matches && <SideMenuIcon />}

      <div>
        <p className='title'>{title}</p>
        <UserInfo />
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
