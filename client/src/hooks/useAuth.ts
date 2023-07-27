import { useState } from 'react';

import { UserAPI } from '@/api/user';

import { useAppDispatch } from '@/store/hooks';
import { setUserData } from '@/store/slices/user';

import { UserData } from '@/components/auth/types';
import { generateGradient } from '@/utils/index';

export const useAuth = () => {
  const [num, setNum] = useState(1);
  const [data, setData] = useState<UserData>({
    name: '',
    password: '',
    photo: null,
    background: generateGradient()
  });

  const dispatch = useAppDispatch();

  const changeData = (changed: Partial<UserData>) => {
    setData(prev => ({ ...prev, ...changed }));
  };

  const submitHandler = async () => {
    const formData = new FormData();

    Object.entries(data).forEach(
      ([key, value]) => value && formData.append(key, value)
    );

    const res = await UserAPI.auth(formData);
    dispatch(setUserData(res.data));
  };

  const changePage = (num: 1 | -1 = 1) => {
    setNum(prev => prev + num);
  };

  return {
    data,
    submitHandler,
    changeData,
    changePage,
    num,
  };
};
