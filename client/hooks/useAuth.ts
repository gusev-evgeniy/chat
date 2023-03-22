import { useState, useMemo } from 'react';

import { UserAPI } from 'api/user';

import { useAppDispatch } from 'store/hooks';
import { setUserData } from 'store/slices/user';

import { UserData } from 'components/auth/types';
import { socket } from 'api/socket';

export const useAuth = () => {
  const [data, setData] = useState<UserData>({
    name: '',
    password: '',
    photo: null,
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
    // socket.connect();
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
