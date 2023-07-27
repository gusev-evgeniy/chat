import Image from 'next/image';
import React, { ChangeEvent, FC, FormEvent } from 'react';
import {
  AuthInput,
  BackButon,
  StyledAdvises,
  StyledButton,
  StyledWrapper,
} from './styles';
import { StyledForm } from '@/styles';

import { AuthPassword } from './types';

import arrow_back from 'images/arrow_back.svg';

const MIN_LENGTH = 6;

export const Password: FC<AuthPassword> = ({
  submitHandler,
  changeData,
  data,
  changePage,
}) => {
  const onKeyChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    changeData({ password: target.value.trim() });
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    submitHandler();
  };

  return (
    <>
      <StyledAdvises>
        <p className='bold'>Create a password</p>
        <span>Length must be between {MIN_LENGTH} and 255 characters</span>
      </StyledAdvises>
      <StyledWrapper padding={'5vh'}>
        <BackButon onClick={() => changePage(-1)}>
          <Image width='30px' height='30px' src={arrow_back} alt='back' />
        </BackButon>

        <StyledForm onSubmit={onSubmitHandler}>
          <AuthInput
            type='password'
            placeholder='Password'
            onChange={onKeyChange}
            autoFocus
            margin='32px 0'
          />

          <StyledButton
            width='160px'
            height='43px'
            disabled={data.password.length < MIN_LENGTH}>
            Submit
            <span className='arrow'>&rarr;</span>
          </StyledButton>
        </StyledForm>
      </StyledWrapper>
    </>
  );
};
