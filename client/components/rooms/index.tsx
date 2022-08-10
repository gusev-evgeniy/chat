import Image from 'next/image';
import React, { FC } from 'react';

import { Room } from './item';

import { RoomsState, setSelectedRoom } from '../../store/slices/rooms';

import search from '../../images/search.svg';
import add_chat from '../../images/add_chat.svg';
import add_chat_fill from '../../images/add_chat_fill.svg';

import { StyledRooms, StyledSearchIcon, StyledSearchInput } from './styled';
import { useAppDispatch } from '../../store/hooks';
import { socket } from '../../api/socket';
import { SelectedRoom } from '../../type/room';

type Props = RoomsState & {
  toggleNewRoom: (isOpen: boolean) => void;
  isOpen: boolean;
  myId: string;
};

export const Rooms: FC<Props> = ({ toggleNewRoom, isOpen, myId, data, selected }) => {
  const dispatch = useAppDispatch();

  const selectRoom = (selectedRoom: SelectedRoom) => {
    socket.emit('ROOMS:JOIN', selectedRoom.roomId);
    dispatch(setSelectedRoom(selectedRoom))
  }

  return (
    <StyledRooms>
      <div className='header'>
        <form>
          <StyledSearchInput type='text' className='search' placeholder='Search' />
          <StyledSearchIcon>
            <Image width='30px' height='30px' src={search} alt='search' />
          </StyledSearchIcon>
        </form>

        <div className='add_chat' onClick={() => toggleNewRoom(!isOpen)}>
          <Image width='32px' height='32px' src={isOpen ? add_chat_fill : add_chat} alt='add_dialog' />
        </div>
      </div>
      <div className='rooms_wrapper'>
        {data.map(room => {
          const isSelected = selected?.roomId === room.id;

          return (
            <Room key={room.id} {...room} myId={myId} isSelected={isSelected} selectRoom={selectRoom} toggleNewRoom={toggleNewRoom}/>
          )
        })}
      </div>
    </StyledRooms>
  );
};
