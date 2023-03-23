import React, { FC, memo } from 'react';

import { StyledCheckbox } from './styles';

type Props = {
  checked: boolean;
};

export const MyCheckbox: FC<Props> = memo(({ checked }) => {

  return (
    <StyledCheckbox>
      <label className='container'>
        <input
          type='checkbox'
          id='user_checkbox'
          checked={checked}
          onClick={(e) => e.stopPropagation()}
          onChange={() => {}} //remove error in console
        />
        <span className='checkmark' />
      </label>
    </StyledCheckbox>
  );
});

MyCheckbox.displayName = 'MyCheckbox';
