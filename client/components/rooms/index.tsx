import Image from 'next/image';
import React, { FC } from 'react';

import { Room } from './item';

import { selectRoom } from '../../store/slices/rooms';

import search from '../../images/search.svg';
import add_chat from '../../images/add_chat.svg';
import add_chat_fill from '../../images/add_chat_fill.svg';

import { StyledRooms, StyledSearchIcon, StyledSearchInput } from './styled';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { instance } from '../../api';
import { setMessagesData } from '../../store/slices/messages';
import { StyledAva } from '../avatar/styles';
import { getRoomsInfo } from '../../store/selectors';
import { openCreateRoom } from '../../store/slices/createRoom';

export const Rooms: FC<{}> = () => {
  const dispatch = useAppDispatch();

  const { me, rooms, typing, selected, isCreatRoomOpen } = useAppSelector(getRoomsInfo)
  console.log('Rooms render')
  const selectRoomHandler = (id: string) => {
    dispatch(selectRoom(id));
  };

  const toggleNewRoom = (isOpen: boolean) => {
    dispatch(openCreateRoom(isOpen));
  };

  const getMessages = async (roomId: string) => {
    try {
      const { data } = await instance.get(`message/?roomId=${roomId}`);
      dispatch(setMessagesData(data));
    } catch (error) {}
  };

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
          <Image width='32px' height='32px' src={isCreatRoomOpen ? add_chat_fill : add_chat} alt='add_dialog' />
        </div>
      </div>
      <div className='rooms_wrapper'>
        {rooms.map((room) => {
          const isSelected = selected === room.id;

          return (
            <Room
              key={room.id}
              room={room}
              myId={me?.id as string}
              isSelected={isSelected}
              selectRoom={selectRoomHandler}
              toggleNewRoom={toggleNewRoom}
              typing={typing[room.id]}
              getMessages={getMessages}
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
};
