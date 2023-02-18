import { useState, useMemo } from 'react';

import { useAppDispatch } from '../store/hooks';
import { setUserData } from '../store/slices/user';

import { instance } from '../api';
import { UserData } from '../components/auth/types';

export const useAuthForm = () => {
  const [num, setNum] = useState(1);
  const [data, setData] = useState<UserData>({
    name: '',
    password: '',
    photo: undefined,
  });

  const dispatch = useAppDispatch();

  const changeData = (changed: Partial<UserData>) => {
    setData(prev => ({ ...prev, ...changed }));
  };

  const nextPage = () => {
    setNum(prev => ++prev);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    Object.entries(data).forEach(
      ([key, value]) => value && formData.append(key, value)
    );

    const res = await instance.post('/user/auth', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });

    dispatch(setUserData(res.data));
  };

  return useMemo(
    () => ({
      data,
      num,
      onSubmit,
      nextPage,
      changeData,
    }),
    []
  );
};
