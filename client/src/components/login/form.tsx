import React, { FC } from 'react';

import { AuthInput, StyledButton, StyledWrapper } from 'components/auth/styles';

import { StyledForm } from 'styles';

type Props = {
  password: string;
  name: string;
  onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  changeData: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const LoginForm: FC<Props> = ({
  changeData,
  name,
  onSubmitHandler,
  password,
}) => {
  const disabled = !password.length || !name.length;

  return (
    <StyledWrapper padding={'5vh'}>
      <StyledForm onSubmit={onSubmitHandler}>
        <AuthInput
          type='text'
          placeholder='Name'
          value={name}
          data-type='name'
          onChange={changeData}
          autoFocus
        />
        <AuthInput
          type='password'
          placeholder='Password'
          value={password}
          data-type='password'
          onChange={changeData}
          margin='32px 0'
        />

        <StyledButton width='160px' height='43px' disabled={disabled}>
          Next
          <span className='arrow'>&rarr;</span>
        </StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
};
