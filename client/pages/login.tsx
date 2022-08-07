import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { instance } from '../api';
import { AlertMessage, StyledAdvises, StyledButton, StyledWrapper } from '../components/auth/styles';
import { useAppSelector } from '../store/hooks';
import { selectUserData, setUserData } from '../store/slices/user';

const Login = () => {
  const [errorText, setErrorText] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const dispatch = useDispatch()

  const me = useAppSelector(selectUserData);

  useEffect(() => {
    if (me) router.push('/main');
  }, [me, router]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await instance.get(`/user/login?name=${name}&password=${password}`);

      dispatch(setUserData(res.data.user));
    } catch (error: any) {
      setErrorText(error.response.data?.message as string);
    }
  }

  const disabled = !password.length || !name.length;

  return (
    <main className='center'>
      {' '}
      <div>
        <StyledAdvises>
          <p className='bold'>Please enter user name and password</p>
          <p>Or <span className='signup_link' onClick={() => router.push('/auth')}>create an account</span> if you don&rsquo;t have one</p>
        </StyledAdvises>
        <StyledWrapper padding={55}>
          <form onSubmit={onSubmitHandler}>
            <input
              type='text'
              className='text-input'
              placeholder='Name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type='password'
              className='text-input'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <StyledButton width='160px' height='48px' disabled={disabled}>
              Next
              <span className='arrow'>&rarr;</span>
            </StyledButton>
          </form>
        </StyledWrapper>

        {!!errorText && <AlertMessage>{errorText}</AlertMessage>}
      </div>
    </main>
  );
};

export default Login;
