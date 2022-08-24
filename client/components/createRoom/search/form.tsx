import Image from 'next/image';
import React, { FC, memo, useState } from 'react';

import { StyledFindUserIntput, StyledLabel } from '../styled';
import search from '../../../images/search.svg';
import { findUsers } from '../../../store/slices/createRoom';
import { instance } from '../../../api';
import { useAppDispatch } from '../../../store/hooks';
import { StyledInputSearchButton } from '../../chat/styled';

export const Form: FC<{}> = memo(() => {
  const [filter, setFilter] = useState('');

  const dispatch = useAppDispatch();

  const onFindUsersHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!filter) {
      return;
    }

    try {
      const { data } = await instance.get(`user/find?name=${filter}`);
      dispatch(findUsers(data));
    } catch (error) {}
  };

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
