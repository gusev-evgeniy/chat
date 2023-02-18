import { useState, useMemo } from 'react';

import { useAppDispatch } from '../store/hooks';
import { setUserData } from '../store/slices/user';

import { UserData } from '../components/auth/types';
import { UserAPI } from '../api/user';

export const useAuth = () => {
  const [data, setData] = useState<UserData>({
    name: '',
    password: '',
    photo: undefined,
  });

  const dispatch = useAppDispatch();

  const changeData = (changed: Partial<UserData>) => {
    setData(prev => ({ ...prev, ...changed }));
  };

  const onSubmit = async () => {
    const formData = new FormData();

    Object.entries(data).forEach(
      ([key, value]) => value && formData.append(key, value)
    );

    const res = await UserAPI.auth(formData);

    dispatch(setUserData(res.data));
  };

  return useMemo(
    () => ({
      data,
      onSubmit,
      changeData,
    }),
    [data]
  );
};
