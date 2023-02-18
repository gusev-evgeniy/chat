import Image from 'next/image';
import React, { FC, memo } from 'react';

import { Room } from './item';

import logout_icon from '../../images/logout.svg';

import { StyledRooms } from './styled';
import { useAppSelector } from '../../store/hooks';
import { StyledAva } from '../avatar/styles';
import { getRoomsInfo } from '../../store/selectors';
import { Empty } from '../../styles';
import { RoomsHeader } from './header';
import { useRooms } from './useRooms';

type Props = {
  isSideMenu?: boolean;
};

export const Rooms: FC<Props> = memo(({ isSideMenu = false }) => {
  const { me, rooms, typing, selected, isCreatRoomOpen } =
    useAppSelector(getRoomsInfo);
  const { matches, onExit, onSelecteHandler, onToggle } =
    useRooms(isCreatRoomOpen);

  return (
    <StyledRooms fullWidth={isSideMenu}>
      <RoomsHeader onToggle={onToggle} isCreatRoomOpen={isCreatRoomOpen} />

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
