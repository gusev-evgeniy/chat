import React, { FC } from 'react';
import { StyledCheckbox } from './styled';

type Props = {
  checked: boolean;
};

export const MyCheckbox: FC<Props> = ({ checked }) => {
  return (
    <StyledCheckbox>
      <label className='container'>
        <input type='checkbox' id='user_checkbox' checked={checked} onChange={() => console.log()} />
        <span className='checkmark'></span>
      </label>
    </StyledCheckbox>
  );
};
