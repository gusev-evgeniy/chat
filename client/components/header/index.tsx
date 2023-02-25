import Image from 'next/image';
import React, { FC, memo } from 'react';

import call_icon from '../../images/call.svg';

import { useAppSelector } from '../../store/hooks';
import { getHeaderInfo } from '../../store/selectors';
import { StyledIconButton } from '../../styles';
import { StyledChatHeader } from '../chat/styled';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { WIDTH } from '../../styles/variables';
import { SideMenuIcon } from '../sideMenu/icon';
import { UserInfo } from './userInfo';
import { useCall } from '../../providers/call/provider';

export const Header: FC<{}> = memo(() => {
  const matches = useMediaQuery(`(max-width: ${WIDTH.MEDIUM})`);
  const { setCallData } = useCall();
  const { title, type, isNewRoom, privateUser, selected } = useAppSelector(getHeaderInfo);

  const onCallHandler = () => {
    if (privateUser) setCallData(privateUser, selected)
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
