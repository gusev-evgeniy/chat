import React from 'react';
import { StyledSearchIcon } from '../contacts/styled';
import { StyledCreateRoom } from './styled';

import search from '../../images/search.svg';
import Image from 'next/image';

export const NewRoom = () => {
  return (
    <StyledCreateRoom>
      <div className='group_name'>
        <form>
          <label htmlFor=''>GROUP NAME</label>
          <input type='text' />
          <div className='count'>30/30</div>
        </form>
      </div>
      <div className='search'>
        <form>
          <input type='text' className='search' placeholder='Search' />
          <StyledSearchIcon>
            <Image width='30px' height='30px' src={search} alt='search' />
          </StyledSearchIcon>
        </form>
      </div>
    </StyledCreateRoom>
  );
};
