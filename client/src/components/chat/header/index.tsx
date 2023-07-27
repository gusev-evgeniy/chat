import Image from 'next/image';
import React, { FC, memo } from 'react';

import { useCall } from '@/providers/call/callProvider';

import { useAppSelector } from '@/store/hooks';
import { getHeaderInfo } from '@/store/selectors';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { StyledChatHeader } from '@/components/chat/styles';
import { SideMenuIcon } from '@/components/sideMenu/icon';
import { UserInfo } from './userInfo';

import call_icon from 'images/call.svg';

import { StyledIconButton } from '@/styles';
import { WIDTH } from '@/styles/variables';

export const Header: FC<{}> = memo(() => {
  const matches = useMediaQuery(`(max-width: ${WIDTH.MEDIUM})`);
  const { setCallData } = useCall();
  const { title, type, isNewRoom, privateUser, selected } =
    useAppSelector(getHeaderInfo);

  const onCallHandler = () => {
    if (privateUser) setCallData(privateUser, selected);
  };

  return (
    <StyledChatHeader>
      {matches && <SideMenuIcon />}

      <div className='header_wrapper'>
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
      </div>
    </StyledChatHeader>
  );
});

Header.displayName = 'Header';
