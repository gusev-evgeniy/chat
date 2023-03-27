import React, { FC, memo } from 'react';

import { useAppSelector } from 'store/hooks';
import { getRoomsInfo } from 'store/selectors';

import { RoomsHeader } from './header';

import { StyledRooms } from './styles';
import { RoomsList } from './roomsList';
import { Footer } from './footer';

type Props = {
  isSideMenu?: boolean;
};

export const Rooms: FC<Props> = memo(({ isSideMenu = false }) => {
  const { me, filter } = useAppSelector(getRoomsInfo);
  console.log('me', me)
  return (
    <StyledRooms fullWidth={isSideMenu}>
      <RoomsHeader value={filter} />

      <div className='rooms_wrapper'>
        <RoomsList isSideMenu={isSideMenu} />
      </div>

      {me && <Footer {...me}/>}
    </StyledRooms>
  );
});

Rooms.displayName = 'Rooms';
