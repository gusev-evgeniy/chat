import React, { FC, memo, useMemo } from 'react';
import { Room as RoomType, SelectedRoom, Typing } from '../../type/room';
import { UserBD } from '../../type/user';
import { StyledAva } from '../auth/styles';
import { StyledRoom } from './styled';

type Props = RoomType & {
  myId: string;
  isSelected: boolean;
  selectRoom: (selectedRoom: SelectedRoom) => void;
  toggleNewRoom: (isOpen: boolean) => void;
  typing: Typing | undefined;
  getMessages: (roomId: string) => void;
};

export const Room: FC<Props> = memo(
  ({ participants, typing, title, myId, type, isSelected, selectRoom, id, toggleNewRoom, getMessages }) => {
    //TODO only private type
    const {
      photo,
      name,
      id: partner,
    } = useMemo<UserBD | undefined>(() => participants.find(({ id }) => id !== myId), []) || {};

    const onSelecteHandler = () => {
      toggleNewRoom(false);

      if (isSelected) {
        return;
      }
      getMessages(id);
      selectRoom({ roomId: id, name: name as string, userId: partner as string });
    };

    return (
      <StyledRoom selected={isSelected} onClick={onSelecteHandler}>
        <StyledAva size={50} backgroundImage={photo} />
        <div className='data'>
          <div className='info'>
            <p className='name bold'>{name}</p>
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
