import { useRouter } from 'next/router';
import React from 'react';

import { AlertMessage, LoginWrapper, StyledAdvises } from 'components/auth/styles';
import { LoginForm } from 'components/login/form';

import { useAuthGuard } from 'hooks/useAuthGuard';
import { useLoginForm } from 'hooks/useLoginForm';

const Login = () => {
  useAuthGuard();
  const router = useRouter();

  const { changeData, data, onSubmitHandler } = useLoginForm();
  const { errorText, name, password } = data;

  return (
    <main className='center'>
      {' '}
      <LoginWrapper>
        <StyledAdvises>
          <p className='bold'>Please enter user name and password</p>
          <p>
            Or{' '}
            <span className='signup_link' onClick={() => router.push('/auth')}>
              create an account
            </span>{' '}
            if you don&rsquo;t have one
          </p>
        </StyledAdvises>
        <LoginForm
          changeData={changeData}
          name={name}
          onSubmitHandler={onSubmitHandler}
          password={password}
        />

        {!!errorText && <AlertMessage>{errorText}</AlertMessage>}
      </LoginWrapper>
    </main>
  );
};

export default Login;
