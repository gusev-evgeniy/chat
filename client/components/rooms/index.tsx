import Image from 'next/image';
import React, { FC, memo, useCallback } from 'react';

import { Room } from './item';

import { selectRoom } from '../../store/slices/rooms';

import search from '../../images/search.svg';
import add_chat from '../../images/add_chat.svg';
import add_chat_fill from '../../images/add_chat_fill.svg';
import logout_icon from '../../images/logout.svg';

import { StyledRooms, StyledSearchIcon, StyledSearchInput } from './styled';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { StyledAva } from '../avatar/styles';
import { getRoomsInfo } from '../../store/selectors';
import { openCreateRoom } from '../../store/slices/createRoom';
import { logout } from '../../store/actions/user';
import { openSideMenu } from '../../store/slices/sideMenu';
import { Empty } from '../../styles';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { WIDTH } from '../../styles/variables';
import { openDialog } from '../../store/slices/dialog';

type Props = {
  isSideMenu?: boolean;
};

export const Rooms: FC<Props> = memo(({ isSideMenu = false }) => {
  const dispatch = useAppDispatch();

  const { me, rooms, typing, selected, isCreatRoomOpen } = useAppSelector(getRoomsInfo);
  const matches = useMediaQuery(`(max-width: ${WIDTH.MEDIUM})`);

  const toggleNewRoom = (toggle: boolean) => {
    if (matches) {
      return dispatch(openDialog('CREATE_ROOM'));
    }

    dispatch(openCreateRoom(toggle));
  };

  const onSelecteHandler = useCallback((id: string) => {
    toggleNewRoom(false);
    dispatch(selectRoom(id));
  }, []);

  const onExit = () => {
    dispatch(logout());
  };

  return (
    <StyledRooms fullWidth={isSideMenu}>
      <div className='header'>
        <form>
          <StyledSearchInput type='text' className='search' placeholder='Search' disabled />
          <StyledSearchIcon>
            <Image width='30px' height='30px' src={search} alt='search' />
          </StyledSearchIcon>
        </form>

        <div className='add_chat' onClick={() => toggleNewRoom(!isCreatRoomOpen)}>
          <Image
            width='32px'
            height='32px'
            src={isCreatRoomOpen ? add_chat_fill : add_chat}
            alt='add_dialog'
          />
        </div>
      </div>

      {!rooms.length && matches && (
        <div className='rooms_wrapper'>
          <Empty>Your rooms will be displayed here</Empty>
        </div>
      )}

      <div className='rooms_wrapper'>
        {rooms.map(room => (
          <Room
            key={room.id}
            room={room}
            myId={me?.id as string}
            isSelected={selected === room.id}
            onSelecteHandler={onSelecteHandler}
            typing={typing[room.id]}
          />
        ))}
      </div>

      <div className='footer'>
        <StyledAva size={45} backgroundImage={me?.photo} />
        <p>{me?.name}</p>
        <div className='image_wrapper' title='Exit' onClick={onExit}>
          <Image width='32px' height='32px' src={logout_icon} alt='add_dialog' />
        </div>
      </div>
    </StyledRooms>
  );
});

Rooms.displayName = 'Rooms';
