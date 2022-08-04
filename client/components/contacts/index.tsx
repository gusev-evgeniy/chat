import Image from 'next/image';
import React from 'react';
import { ContactItem } from './item';
import { StyledContacts } from './styled';

import search from '../../images/search.svg';

export const Contacts = () => {
  return (
    <StyledContacts>
      <div className='header'>
        <form>
          <input type='text' className='search' placeholder='Search' />
          <div className='search_icon'>
            <Image width='30px' height='30px' src={search} alt='add_photo' />
          </div>
        </form>

        <div className='add_chat' />
      </div>
      <ContactItem />
      <ContactItem />
      <ContactItem />
      <ContactItem />
    </StyledContacts>
  );
};
