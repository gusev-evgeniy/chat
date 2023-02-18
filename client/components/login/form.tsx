import React, { FC } from 'react';
import { LoginKeysData } from '../../hooks/useLoginForm';
import { StyledForm } from '../../styles';
import { StyledButton, StyledWrapper } from '../auth/styles';

type Props = {
  password: string;
  name: string;
  onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  changeData: (name: LoginKeysData, value: string) => void;
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
        <input
          type='text'
          className='text-input'
          placeholder='Name'
          value={name}
          onChange={e => changeData('name', e.target.value)}
        />
        <input
          type='password'
          className='text-input'
          placeholder='Password'
          value={password}
          onChange={e => changeData('password', e.target.value)}
        />

        <StyledButton width='160px' height='48px' disabled={disabled}>
          Next
          <span className='arrow'>&rarr;</span>
        </StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
};
