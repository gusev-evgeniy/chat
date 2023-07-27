import { createContext, FC, useContext, useState } from 'react';

import { UserAPI } from '@/api/user';

import { useAppDispatch } from '@/store/hooks';
import { setUserData } from '@/store/slices/user';

import { UserData } from '@/components/auth/types';

type AuthContextType = {};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();

  const [num, setNum] = useState(1);
  const [data, setData] = useState<UserData>({
    name: '',
    password: '',
    photo: null,
    background: ''
  });

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

  const changePage = (num: 1 | -1 = 1) => {
    setNum(prev => prev + num);
  };

  const value = {
    data,
    onSubmit,
    changeData,
    changePage,
    num,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
