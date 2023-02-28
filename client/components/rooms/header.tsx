import Image from 'next/image';
import { FC } from 'react';
import { StyledSearchIcon, StyledSearchInput } from './styles';

import search from 'images/search.svg';
import add_chat from 'images/add_chat.svg';
import add_chat_fill from 'images/add_chat_fill.svg';

type Props = {
  onToggle: () => void;
  isCreatRoomOpen: boolean;
};

export const RoomsHeader: FC<Props> = ({ isCreatRoomOpen, onToggle }) => {
  return (
    <div className='header'>
      <form>
        <StyledSearchInput
          type='text'
          className='search'
          placeholder='Search'
          disabled
        />
        <StyledSearchIcon>
          <Image width='30px' height='30px' src={search} alt='search' />
        </StyledSearchIcon>
      </form>

      <div className='add_chat' onClick={onToggle}>
        <Image
          width='32px'
          height='32px'
          src={isCreatRoomOpen ? add_chat_fill : add_chat}
          alt='add_dialog'
        />
      </div>
    </div>
  );
};
