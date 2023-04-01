import { ChangeEvent, FormEvent, useState } from 'react';

import { instance } from 'api';

import { useAppDispatch } from 'store/hooks';
import { findUsers } from 'store/slices/createRoom';

export const useSearchForm = () => {
  const [filter, setFilter] = useState('');

  const dispatch = useAppDispatch();

  const onFindUsersHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!filter) {
      return;
    }

    try {
      const { data } = await instance.get(`user/find?name=${filter}`);
      dispatch(findUsers(data));
    } catch (error) {}
  };

  const onChangeFilter = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFilter(target.value);
  };

  return {
    onFindUsersHandler,
    onChangeFilter,
    filter,
  };
};
