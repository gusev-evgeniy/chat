import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectUserData, setUserData } from '../store/slices/user';

import { instance } from '../api';

import { Name } from '../components/auth/name';
import { Password } from '../components/auth/password';
import { UserData } from '../components/auth/types';
import { Welcome } from '../components/auth/welcome';


const Auth = () => {
  const [num, setNum] = useState(1);
  const [data, setData] = useState<UserData>({
    name: '',
    password: '',
    photo: undefined,
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const me = useAppSelector(selectUserData);

  useEffect(() => {
    if (me) router.push('/main');
  }, [me, router]);

  const changeData = (changed: Partial<UserData>) => {
    setData(prev => ({ ...prev, ...changed }));
  };

  const nextPage = () => {
    setNum(prev => ++prev);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    const { photo, name, password } = data;

    if (photo) {
      formData.append('photo', photo);
    }

    if (name) {
      formData.append('name', name);
    }

    if (password) {
      formData.append('password', password);
    }

    const res = await instance.post('/user', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });

    dispatch(setUserData(res.data));

  };

  const pages = {
    1: <Welcome nextPage={nextPage} />,
    2: <Name nextPage={nextPage} data={data} changeData={changeData} />,
    3: <Password nextPage={onSubmit} data={data} changeData={changeData} />,
  };

  return <main className='center'>{pages[num as keyof typeof pages]}</main>;
};

export default Auth;
