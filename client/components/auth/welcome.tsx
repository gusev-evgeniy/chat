import { useRouter } from 'next/router';
import { FC } from 'react';

import { StyledButton, StyledWrapper } from './styles';

type Props = {
  nextPage: () => void;
};

export const Welcome: FC<Props> = ({ nextPage }) => {
  const router = useRouter();

  return (
    <StyledWrapper padding={'5vh'}>
      <h3>Welcome to TalkClub!</h3>
      <div className='hello_letter'>
        We&rsquo;re working hard to get TalkClub ready for everyone! While we
        wrap up the finishing youches, we&rsquo;re adding people gradually to
        make sure nothing breaks{' '}
      </div>
      <div>
        <StyledButton width='230px' height='48px' onClick={nextPage}>
          Create user
        </StyledButton>
        <p className='sign_in' onClick={() => router.push('/login')}>
          Sign in{' '}
        </p>
      </div>
    </StyledWrapper>
  );
};
