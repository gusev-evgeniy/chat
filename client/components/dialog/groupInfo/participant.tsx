import React, { FC } from 'react';
import Image from 'next/image';

import { StyledIconButton } from '../../../styles';
import { Avatar } from '../../avatar';
import { StyledSearchUserItem } from '../../createRoom/styled';

import logout_icon from '../../../images/logout.svg';
import { UserBD } from '../../../type/user';

type Props = UserBD & {
  onLeave: () => void;
  myId: string | undefined;
};

export const Participant: FC<Props> = ({
  id,
  name,
  online,
  photo,
  onLeave,
  myId,
}) => {
  return (
    <StyledSearchUserItem className='user_wrapper' key={id}>
      <div className='data_wrapper'>
        <Avatar size={45} photo={photo} name={name} online={online} />
        <p className='bold'>{name}</p>
      </div>
ß
      {id === myId && (
        <StyledIconButton title='Leave Group' onClick={onLeave}>
          <Image
            width='32px'
            height='32px'
            src={logout_icon}
            alt='add_dialog'
          />
        </StyledIconButton>
      )}
    </StyledSearchUserItem>
  );
};
