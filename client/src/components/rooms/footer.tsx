import Image from 'next/image';
import React, { FC } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/actions/user';

import { Avatar } from '@/components/avatar';

import { UserBD } from '@/types/user';

import logout_icon from 'images/logout.svg';

export const Footer: FC<UserBD> = ({ name, photo, background }) => {
  const dispatch = useAppDispatch();

  const onExit = () => {
    dispatch(logout());
    // socket.disconnect();
  }

  return (
    <div className='footer'>
      <div className='user_info'>
      <Avatar name={name} photo={photo} size={40} gradient={background} />
        <p>{name}</p>
      </div>
      <div className='image_wrapper' title='Exit' onClick={onExit}>
        <Image width='32px' height='32px' src={logout_icon} alt='add_dialog' />
      </div>
    </div>
  );
};
