import Image from 'next/image';
import React, { FC, memo, useCallback } from 'react';

import { Room } from './item';

import { selectRoom } from '../../store/slices/rooms';

import search from '../../images/search.svg';
import add_chat from '../../images/add_chat.svg';
import add_chat_fill from '../../images/add_chat_fill.svg';

import { StyledRooms, StyledSearchIcon, StyledSearchInput } from './styled';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { StyledAva } from '../avatar/styles';
import { getRoomsInfo } from '../../store/selectors';
import { openCreateRoom } from '../../store/slices/createRoom';

export const Rooms: FC<{}> = memo(() => {
  const dispatch = useAppDispatch();

  const { me, rooms, typing, selected, isCreatRoomOpen } = useAppSelector(getRoomsInfo);
  console.log('rooms', rooms)
  const toggleNewRoom = (toggle: boolean) => dispatch(openCreateRoom(toggle));

  const onSelecteHandler = useCallback((id: string) => {
    toggleNewRoom(false);
    dispatch(selectRoom(id));
  }, []);

  return (
    <StyledRooms>
      <div className='header'>
        <form>
          <StyledSearchInput type='text' className='search' placeholder='Search' />
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

      <div className='rooms_wrapper'>
        {rooms.map(room => {
          return (
            <Room
              key={room.id}
              room={room}
              myId={me?.id as string}
              isSelected={selected === room.id}
              onSelecteHandler={onSelecteHandler}
              typing={typing[room.id]}
            />
          );
        })}
      </div>

      <div className='footer'>
        <StyledAva size={45} backgroundImage={me?.photo} />
        <p>{me?.name}</p>
      </div>
    </StyledRooms>
  );
});

Rooms.displayName = 'Rooms';
