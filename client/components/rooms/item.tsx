import React, { FC, memo, useMemo } from 'react';
import { Room as RoomType } from '../../type/room';
import { UserBD } from '../../type/user';
import { StyledAva } from '../auth/styles';
import { StyledRoom } from './styled';

type Props = RoomType & {
  myId: string;
  isSelected: boolean;
  selectRoom: (id: string) => void;
};

export const Room: FC<Props> = memo(({ participants, title, myId, type, isSelected, selectRoom, id }) => {
  //TODO only private type
  const { photo, name } =
    useMemo<UserBD | undefined>(() => participants.find(({ id }) => id !== myId), []) || {};

  const onSelecteHandler = () => {
    if (isSelected) {
      return;
    }

    selectRoom(id)
  }

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
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repudiandae!
        </p>
      </div>
    </StyledRoom>
  );
});

Room.displayName = 'Room';
