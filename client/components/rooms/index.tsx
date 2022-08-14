import Image from 'next/image';
import React, { FC } from 'react';

import { Room } from './item';

import { RoomsState, selectRoom } from '../../store/slices/rooms';

import search from '../../images/search.svg';
import add_chat from '../../images/add_chat.svg';
import add_chat_fill from '../../images/add_chat_fill.svg';

import { StyledRooms, StyledSearchIcon, StyledSearchInput } from './styled';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SelectedRoom, Typing } from '../../type/room';
import { instance } from '../../api';
import { setMessagesData } from '../../store/slices/messages';
import { selectMyData } from '../../store/slices/user';
import { StyledAva } from '../avatar/styles';

type Props = RoomsState & {
  toggleNewRoom: (isOpen: boolean) => void;
  isOpen: boolean;
  myId: string;
  typing: Typing[];
};

export const Rooms: FC<Props> = ({ toggleNewRoom, isOpen, myId, data, selected, typing }) => {
  const dispatch = useAppDispatch();

  const me = useAppSelector(selectMyData);

  const selectRoomHandler = (selectedRoom: SelectedRoom) => {
    dispatch(selectRoom(selectedRoom));
  };

  const getMessages = async (roomId: string) => {
    try {
      const { data } = await instance.get(`message/?roomId=${roomId}`);
      dispatch(setMessagesData(data));
    } catch (error) {}
  };

  const resizeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e)
  }

  console.log('rooms_data', data);
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
        {data.map((room, index) => {
          const isSelected = selected?.roomId === room.id;
          const isTyping = typing.find(({ roomId }) => roomId === room.id);

          return (
            <Room
              key={room.id}
              room={room}
              myId={myId}
              isSelected={isSelected}
              selectRoom={selectRoomHandler}
              toggleNewRoom={toggleNewRoom}
              typing={isTyping}
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
