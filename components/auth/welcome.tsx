import { FC } from 'react';
import { StyledButton, StyledWrapper } from './styles';
import { Auth } from './types';

export const Welcome:FC<Auth> = ({ nextPage }) => {
  return (
    <StyledWrapper padding={55}>
      <h3>Welcome to TalkClub!</h3>
      <div className='hello_letter'>
        We’re working hard to get TalkClub ready for everyone! While we wrap up the finishing youches, we’re
        adding people gradually to make sure nothing breaks{' '}
      </div>
      <div>
        <StyledButton width='230px' height='48px' onClick={nextPage}>
          Create user
        </StyledButton>
        <p className='sign_in'>Sign in </p>
      </div>
    </StyledWrapper>
  );
};
