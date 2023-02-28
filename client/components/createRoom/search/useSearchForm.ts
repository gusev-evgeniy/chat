import { useMemo, useState } from 'react';
import { instance } from 'api';
import { useAppDispatch } from 'store/hooks';
import { findUsers } from 'store/slices/createRoom';

export const useSearchForm = () => {
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

  const onChangeFilter = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(target.value);
  };

  return useMemo(
    () => ({
      onFindUsersHandler,
      onChangeFilter,
      filter,
    }),
    [filter]
  );
};
