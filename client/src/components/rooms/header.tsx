import Image from 'next/image';
import { ChangeEvent, FC } from 'react';
import { StyledSearchIcon, StyledSearchInput } from './styles';

import search from 'images/search.svg';
import add_chat from 'images/add_chat.svg';
import { useAppDispatch } from '@/store/hooks';
import { openDialog } from '@/store/slices/dialog';
import { updateSearchValue } from '@/store/slices/search';

type Props = {
  value: string;
};

export const RoomsHeader: FC<Props> = ({ value }) => {
  const dispatch = useAppDispatch();

  const onKeyChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchValue(target.value.trim()))
  };

  const onToggle = () => {
    dispatch(openDialog('CREATE_ROOM'));
  };

  return (
    <div className='header'>
      <form>
        <StyledSearchInput
          type='text'
          className='search'
          placeholder='Search'
          onChange={onKeyChange}
          value={value}
        />
        <StyledSearchIcon>
          <Image width='30px' height='30px' src={search} alt='search' />
        </StyledSearchIcon>
      </form>

      <div className='add_chat' onClick={onToggle}>
        <Image width='32px' height='32px' src={add_chat} alt='add_dialog' />
      </div>
    </div>
  );
};
