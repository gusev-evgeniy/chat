import React from 'react';
import { StyledChat } from './styled';

export const Chat = () => {
  return (
    <StyledChat>
      <div className='item my'>
        <p className='message'>Привет</p>
        <span className='time'>18:57</span>
      </div>
      <div className='item'>
        <p className='message'>Привет. как дела?</p>
        <span className='time'>18:58</span>
      </div>
      <div className='item'>
        <p className='message'>норм</p>
        <span className='time'>19:20</span>
      </div>
      <div className='item'>
        <p className='message'>а твои?</p>
        <span className='time'>19:21</span>
      </div>
      <form>
        <input type='text' />
      </form>
    </StyledChat>
  );
};
