import Image from 'next/image';
import React, { FC, memo } from 'react';

import { StyledInputSearchButton } from '@/components/chat/styles';
import { useSearchForm } from './useSearchForm';

import search from '@/images/search.svg';
import { StyledFindUserIntput, StyledLabel } from '../styles';

export const Form: FC<{}> = memo(() => {
  const { filter, onFindUsersHandler, onChangeFilter } = useSearchForm();

  return (
    <form onSubmit={onFindUsersHandler}>
      <StyledLabel htmlFor=''>Search</StyledLabel>
      <div className='input_wrapper'>
        <StyledFindUserIntput
          type='text'
          className='search'
          placeholder='Type usernames'
          value={filter}
          onChange={onChangeFilter}
          autoFocus
        />
        <StyledInputSearchButton>
          <Image width='30px' height='30px' src={search} alt='search' />
        </StyledInputSearchButton>
      </div>
    </form>
  );
});

Form.displayName = 'Form';
