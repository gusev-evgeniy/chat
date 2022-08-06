import Image from 'next/image';
import React, { FC } from 'react';
import { ContactItem } from './item';
import { StyledContacts, StyledSearchIcon, StyledSearchInput } from './styled';

import search from '../../images/search.svg';
import add_chat from '../../images/add_chat.svg';
import add_chat_fill from '../../images/add_chat_fill.svg';

type Props = {
  toggleNewRoom: () => void;
  newRoomIsOpen: boolean;
};

export const Contacts: FC<Props> = ({ toggleNewRoom, newRoomIsOpen }) => {
  return (
    <StyledContacts>
      <div className='header'>
        <form>
          <StyledSearchInput type='text' className='search' placeholder='Search' />
          <StyledSearchIcon>
            <Image width='30px' height='30px' src={search} alt='search' />
          </StyledSearchIcon>
        </form>

        <div className='add_chat' onClick={toggleNewRoom}>
          <Image width='32px' height='32px' src={newRoomIsOpen ? add_chat_fill : add_chat} alt='add_dialog' />
        </div>
      </div>
      <div className='contacts_wrapper'>
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
      </div>
    </StyledContacts>
  );
};
