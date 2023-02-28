import React from 'react';
import Image from 'next/image';

import { useAppDispatch } from 'store/hooks';
import { openSideMenu } from 'store/slices/sideMenu';

import menu from 'images/menu.svg';

import { StyledAbsoluteSideMenuIcon, StyledSideMenuIcon } from './styles';

export const SideMenuIcon = ({ absolute = false }) => {
  const dispatch = useAppDispatch();

  const openSideMenuHandler = () => {
    dispatch(openSideMenu());
  };

  if (absolute) {
    return (
      <StyledAbsoluteSideMenuIcon onClick={openSideMenuHandler}>
        <Image width='30px' height='30px' src={menu} alt='menu' />
      </StyledAbsoluteSideMenuIcon>
    );
  }

  return (
    <StyledSideMenuIcon onClick={openSideMenuHandler}>
      <Image width='30px' height='30px' src={menu} alt='menu' />
    </StyledSideMenuIcon>
  );
};
