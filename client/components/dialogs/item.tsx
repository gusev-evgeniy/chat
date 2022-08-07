import React from 'react';
import { StyledAva } from '../auth/styles';
import { StyledDialogItem } from './styled';

export const DialogsItem = () => {
  return (
    <StyledDialogItem>
      <StyledAva size={50} />
      <div className='data'>
        <div className='info'>
          <p className='name bold'>Telegram</p>
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
};
