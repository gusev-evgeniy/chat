import React, { FC } from 'react';
import { StyledAdvises, StyledButton, StyledWrapper } from './styles';
import { Auth } from './types';

const MIN_LENGTH = 6;

export const Password: FC<Auth> = ({ nextPage, changeData, data }) => {
  
  const onKeyChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    changeData({ password: target.value.trim() });
  };

  return (
    <>
      <StyledAdvises>
        <p>Create a password</p>
        <span>Minimum password length {MIN_LENGTH} characters</span>
      </StyledAdvises>
      <StyledWrapper padding={55}>
        <input type='password' className='text-input' placeholder='Password' onChange={e => onKeyChange(e)} />
        <StyledButton
          width='160px'
          height='48px'
          onClick={nextPage}
          disabled={data.password.length < MIN_LENGTH}
        >
          Submit
          <span className='arrow'>&rarr;</span>
        </StyledButton>
      </StyledWrapper>
    </>
  );
};