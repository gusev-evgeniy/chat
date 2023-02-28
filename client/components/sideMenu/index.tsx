import React, { memo } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { openSideMenu, sideMenuIsOpen } from 'store/slices/sideMenu';

import { useMediaQuery } from 'hooks/useMediaQuery';

import Portal from 'components/portal';
import { Rooms } from 'components/rooms';

import { WIDTH } from 'styles/variables';
import { StyledSideMenuWrapper, StyledSideMenu } from './styles';

export const SideMenu = memo(() => {
  const isOpen = useAppSelector(sideMenuIsOpen);

  const dispatch = useAppDispatch();
  const matches = useMediaQuery(`(min-width: ${WIDTH.MEDIUM})`);

  if (!isOpen || matches) {
    return null;
  }

  const closeHandler = () => {
    dispatch(openSideMenu());
  };

  return (
    <Portal type='side_menu'>
      <StyledSideMenuWrapper datatype='veil' onClick={closeHandler}>
        <StyledSideMenu onClick={e => e.stopPropagation()}>
          <Rooms isSideMenu={true} />
        </StyledSideMenu>
      </StyledSideMenuWrapper>
    </Portal>
  );
});

SideMenu.displayName = 'SideMenu';
