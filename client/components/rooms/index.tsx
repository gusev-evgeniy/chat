import Image from 'next/image';
import React, { FC, memo } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getRoomsInfo } from 'store/selectors';

import { StyledAva } from 'components/avatar/styles';
import { RoomsHeader } from './header';

import logout_icon from 'images/logout.svg';

import { StyledRooms } from './styles';
import { RoomsList } from './roomsList';
import { logout } from 'store/actions/user';
import { socket } from 'api/socket';

type Props = {
  isSideMenu?: boolean;
};

export const Rooms: FC<Props> = memo(({ isSideMenu = false }) => {
  const dispatch = useAppDispatch();

  const { me, filter } = useAppSelector(getRoomsInfo);

  const onExit = () => {
    dispatch(logout());
    socket.disconnect();
  }

  return (
    <StyledRooms fullWidth={isSideMenu}>
      <RoomsHeader value={filter} />

      <div className='rooms_wrapper'>
        <RoomsList />
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
