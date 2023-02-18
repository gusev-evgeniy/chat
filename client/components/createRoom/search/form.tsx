import Image from 'next/image';
import React, { FC, memo } from 'react';

import { StyledFindUserIntput, StyledLabel } from '../styled';
import search from '../../../images/search.svg';
import { StyledInputSearchButton } from '../../chat/styled';
import { useSearchForm } from './useSearchForm';

export const Form: FC<{}> = memo(() => {
  const { filter, onFindUsersHandler, setFilter } = useSearchForm();

  return (
    <form onSubmit={onFindUsersHandler}>
      <StyledLabel htmlFor=''>Search</StyledLabel>
      <div className='input_wrapper'>
        <StyledFindUserIntput
          type='text'
          className='search'
          placeholder='Type usernames'
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <StyledInputSearchButton>
          <Image width='30px' height='30px' src={search} alt='search' />
        </StyledInputSearchButton>
      </div>
    </form>
  );
});

Form.displayName = 'Form';
