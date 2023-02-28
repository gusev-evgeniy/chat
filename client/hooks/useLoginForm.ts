import { useMemo, useState } from 'react';

import { UserAPI } from 'api/user';
import { useAppDispatch } from 'store/hooks';
import { setUserData } from 'store/slices/user';

const DEFAULT_DATA = {
  errorText: '',
  name: '',
  password: '',
};

export type LoginKeysData = keyof typeof DEFAULT_DATA;

export const useLoginForm = () => {
  const [data, setData] = useState(DEFAULT_DATA);

  const dispatch = useAppDispatch();

  const changeData = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const type = target.getAttribute('data-type');

    if (type) setData(prev => ({ ...prev, [type]: target.value }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { errorText, ...rest } = data;

    try {
      const res = await UserAPI.loging(rest);
      dispatch(setUserData(res.data));
    } catch (error: any) {
      setData(prev => ({
        ...prev,
        errorText: error.response.data?.message as string,
      }));
    }
  };

  return useMemo(
    () => ({
      onSubmitHandler,
      data,
      changeData,
    }),
    [data]
  );
};
