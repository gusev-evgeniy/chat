import React, { FC, memo, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useAppSelector } from '@/store/hooks';
import { getRoomsInfo } from '@/store/selectors';

import { RoomsHeader } from './header';

import { StyledRooms } from './styles';
import { RoomsList } from './roomsList';
import { Footer } from './footer';

type Props = {
  isSideMenu?: boolean;
};

export const Rooms: FC<Props> = memo(({ isSideMenu = false }) => {
  const { me, search } = useAppSelector(getRoomsInfo);

  const debounced = useDebouncedCallback(() => {
    if (search) console.log('11111');
  }, 1000);

  useEffect(() => {debounced()}, [search]);

  return (
    <StyledRooms fullWidth={isSideMenu}>
      <RoomsHeader value={search} />

      <div className='rooms_wrapper'>
        <RoomsList isSideMenu={isSideMenu} />
      </div>

      {me && <Footer {...me} />}
    </StyledRooms>
  );
});

Rooms.displayName = 'Rooms';
