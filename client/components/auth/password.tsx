import Image from 'next/image';
import React, { FC } from 'react';
import {
  BackButon,
  StyledAdvises,
  StyledButton,
  StyledWrapper,
} from './styles';
import { AuthPassword } from './types';

import arrow_back from 'images/arrow_back.svg';

const MIN_LENGTH = 6;

export const Password: FC<AuthPassword> = ({
  submitHandler,
  changeData,
  data,
}) => {
  const onKeyChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    changeData({ password: target.value.trim() });
  };

  return (
    <>
      <StyledAdvises>
        <p className='bold'>Create a password</p>
        <span>Length must be between {MIN_LENGTH} and 255 characters</span>
      </StyledAdvises>
      <StyledWrapper padding={'5vh'}>
        <BackButon>
          <Image width='30px' height='30px' src={arrow_back} alt='back' />
        </BackButon>

        <input
          type='password'
          className='text-input'
          placeholder='Password'
          onChange={onKeyChange}
          autoFocus
        />

        <StyledButton
          width='160px'
          height='43px'
          onClick={submitHandler}
          disabled={data.password.length < MIN_LENGTH}>
          Submit
          <span className='arrow'>&rarr;</span>
        </StyledButton>
      </StyledWrapper>
    </>
  );
};
