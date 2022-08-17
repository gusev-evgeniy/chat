import React, { FC, memo, useCallback, useMemo } from 'react';
import { RoomsState } from '../../store/slices/rooms';
import { Room as RoomType, SelectedRoom, Typing } from '../../type/room';
import { UserBD } from '../../type/user';
import { Avatar } from '../avatar';
import { StyledAva } from '../avatar/styles';
import { StyledRoom } from './styled';

type Props = {
  room: RoomType;
  myId: string;
  isSelected: boolean;
  selectRoom: (selectedRoom: SelectedRoom) => void;
  toggleNewRoom: (isOpen: boolean) => void;
  typing: Typing | undefined;
  getMessages: (roomId: string) => void;
};

type RoomInfo = {
  id: string;
  title: string;
  image: string | null;
}

export const Room: FC<Props> = memo(
  ({  typing, myId, isSelected, selectRoom, toggleNewRoom, getMessages, room }) => {
    const { participants, id: roomId, type, title: roomTitle } = room || {};
    //TODO only private type

    const {
      image,
      title,
      id,
    } = useMemo<RoomInfo>(() => {
      console.log('hello')
      if (type === 'group') {
        return { image: null, title: roomTitle as string, id: roomId };
      }

      const { id, name, photo } = participants.find(({ id }) => id !== myId) as UserBD;
      return { id, title: name, image: photo };
    }, [room.id]) || {};
    console.log('title', title)
    const onSelecteHandler = () => {
      toggleNewRoom(false);

      if (isSelected) {
        return;
      }
      getMessages(roomId);
      selectRoom({ name: title, roomId, userId: id, type });
    };

    return (
      <StyledRoom selected={isSelected} onClick={onSelecteHandler}>
        <Avatar name={title} photo={image} size={50} online={false}/>
        <div className='data'>
          <div className='info'>
            <p className='name bold'>{title}</p>
            <div className='time'>
              <div className='icon' />
              21:03
            </div>
          </div>
          <p className='last_message'>
            {typing
              ? `...${typing.user} печатает`
              : `
            
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repudiandae!
            `}
          </p>
        </div>
      </StyledRoom>
    );
  }
);

Room.displayName = 'Room';
