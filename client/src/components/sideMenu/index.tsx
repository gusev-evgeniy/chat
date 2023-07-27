import React, { FC, memo } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { openSideMenu } from '@/store/slices/sideMenu';

import Portal from '@/components/portal';
import { Rooms } from '@/components/rooms';

import { StyledSideMenuWrapper, StyledSideMenu } from './styles';
import { selectSideMenu } from '@/store/selectors';

export const SideMenu: FC<{}> = memo(() => {
  const { isOpen } = useAppSelector(selectSideMenu);

  const dispatch = useAppDispatch();

  if (!isOpen) {
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
