import React, { FC, useState } from 'react';
import { StyledAdvises, StyledButton, StyledWrapper } from './styles';
import { Auth } from './types';

export const Password: FC<Auth> = ({ nextPage }) => {
  const [password, setPassword] = useState('');

  const onKeyChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(target.value.trim());
  };

  return (
    <>
      <StyledAdvises>
        <p>Create a password</p>
      </StyledAdvises>
      <StyledWrapper padding={55}>
        <input type='password' className='text-input' placeholder='Password' onChange={e => onKeyChange(e)} />
        <StyledButton width='160px' height='48px' onClick={nextPage} disabled={!password.length}>
          Next
          <span className='arrow'>&rarr;</span>
        </StyledButton>
      </StyledWrapper>
    </>
  );
};
