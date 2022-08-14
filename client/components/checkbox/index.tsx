import React, { FC, memo } from 'react';
import { StyledCheckbox } from './styled';

type Props = {
  checked: boolean;
};

export const MyCheckbox: FC<Props> = memo(({ checked }) => {

  const onCheckHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <StyledCheckbox >
      <label className='container'>
        <input type='checkbox' id='user_checkbox' checked={checked} onClick={onCheckHandler} />
        <span className='checkmark' />
      </label>
    </StyledCheckbox>
  );
});

MyCheckbox.displayName = 'MyCheckbox';
