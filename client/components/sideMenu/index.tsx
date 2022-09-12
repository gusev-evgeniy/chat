import React, { memo } from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { openSideMenu, sideMenuIsOpen } from '../../store/slices/sideMenu';

import Portal from '../dialog/portal';
import { Rooms } from '../rooms';

import { WIDTH } from '../../styles/variables';
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
    <Portal>
      <StyledSideMenuWrapper datatype='veil' onClick={closeHandler}>
        <StyledSideMenu onClick={e => e.stopPropagation()}>
          <Rooms isSideMenu={true} />
        </StyledSideMenu>
      </StyledSideMenuWrapper>
    </Portal>
  );
});

SideMenu.displayName = 'SideMenu';
