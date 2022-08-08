import React, { FC, memo, useMemo } from 'react';
import { RoomsState } from '../../store/slices/rooms';
import { Room } from '../../type/room';
import { UserBD } from '../../type/user';
import { StyledAva } from '../auth/styles';
import { StyledDialogItem } from './styled';

type Props = Room & {
  myId: string;
  selected: RoomsState['selected'];
};

export const DialogsItem: FC<Props> = memo(({ participants, title, myId, type, selected }) => {

  //TODO only private type
  const { photo, name } =
    useMemo<UserBD | undefined>(() => participants.find(({ id }) => id !== myId), []) || {};

  return (
    <StyledDialogItem>
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
    </StyledDialogItem>
  );
});

DialogsItem.displayName = 'DialogsItem';
