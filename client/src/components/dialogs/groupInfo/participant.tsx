import React, { FC, MouseEventHandler } from 'react';
import Image from 'next/image';

import { Avatar } from '@/components/avatar';

import logout_icon from '@/images/logout.svg';

import { StyledSearchUserItem } from '@/styles';
import { StyledIconButton } from '@/styles';
import { UserBD } from '@/types/user';

type Props = UserBD & {
  onLeave: MouseEventHandler;
  myId: string | undefined;
};

export const Participant: FC<Props> = ({
  id,
  name,
  online,
  photo,
  onLeave,
  myId,
  background,
}) => {
  return (
    <StyledSearchUserItem className='user_wrapper' key={id}>
      <div className='data_wrapper'>
        <Avatar
          size={45}
          photo={photo}
          name={name}
          online={online}
          gradient={background}
        />
        <p className='bold'>{name}</p>
      </div>

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
