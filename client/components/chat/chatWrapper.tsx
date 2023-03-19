import React, { FC } from 'react';
import { Chat } from '.';

import { useAppSelector } from 'store/hooks';
import { selectRooms } from 'store/selectors';

import { SideMenuIcon } from 'components/sideMenu/icon';

import { Empty } from 'styles';
import { StyledChat } from './styles';

export const ChatWrapper: FC<{ matches: boolean }> = ({ matches }) => {
  const { selected } = useAppSelector(selectRooms);

  if (!selected) {
    return (
      <StyledChat empty={true}>
        {!matches && <SideMenuIcon absolute={true} />}
        <Empty>Сhoose who you would like to write to</Empty>
      </StyledChat>
    );
  }

  return <Chat />;
};
