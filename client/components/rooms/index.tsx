import Image from 'next/image';
import React, { FC, memo } from 'react';

import { useAppSelector } from 'store/hooks';
import { getRoomsInfo } from 'store/selectors';

import { Room } from './item';
import { StyledAva } from 'components/avatar/styles';
import { RoomsHeader } from './header';
import { useRooms } from './useRooms';

import logout_icon from 'images/logout.svg';

import { StyledRooms } from './styles';
import { Empty } from 'styles';
import { RoomsList } from './roomsList';

type Props = {
  isSideMenu?: boolean;
};

export const Rooms: FC<Props> = memo(({ isSideMenu = false }) => {
  const { me, filter } = useAppSelector(getRoomsInfo);
  const { onExit, onSelecteHandler } = useRooms();

  return (
    <StyledRooms fullWidth={isSideMenu}>
      <RoomsHeader value={filter} />

      <div className='rooms_wrapper'>
        <RoomsList onSelecteHandler={onSelecteHandler} />
      </div>

      <div className='footer'>
        <div className='user_info'>
          <StyledAva size={40} backgroundImage={me?.photo} />
          <p>{me?.name}</p>
        </div>
        <div className='image_wrapper' title='Exit' onClick={onExit}>
          <Image
            width='32px'
            height='32px'
            src={logout_icon}
            alt='add_dialog'
          />
        </div>
      </div>
    </StyledRooms>
  );
});

Rooms.displayName = 'Rooms';
