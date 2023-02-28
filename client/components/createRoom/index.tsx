import React, { FC, useEffect } from 'react';

import { useMediaQuery } from 'hooks/useMediaQuery';

import { useAppDispatch } from 'store/hooks';
import { createRoomsDefault } from 'store/slices/createRoom';

import { SideMenuIcon } from 'components/sideMenu/icon';
import { GroupName } from './groupName';
import { Search } from './search';

import { WIDTH } from 'styles/variables';
import { StyledCreateRoom } from './styles';

export const NewRoom: FC<{}> = () => {
  const dispatch = useAppDispatch();

  const matches = useMediaQuery(`(max-width: ${WIDTH.MEDIUM})`);

  useEffect(() => {
    return () => {
      dispatch(createRoomsDefault());
    };
  }, []);

  return (
    <StyledCreateRoom>
      {matches && <SideMenuIcon absolute={true} />}

      <div className='container'>
        <GroupName/>

        <Search />
      </div>
    </StyledCreateRoom>
  );
};
