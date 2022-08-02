import { useState } from 'react';

import { Name } from '../components/auth/name';
import { Password } from '../components/auth/password';
import { UserData } from '../components/auth/types';
import { Welcome } from '../components/auth/welcome';

export const Auth = () => {
  const [num, setNum] = useState(1);
  const [data, setData] = useState<UserData>({
    name: '',
    password: '',
    photo: undefined,
  });

  const changeData = (changed: Partial<UserData>) => {
    setData(prev => ({ ...prev, ...changed }));
  };

  const nextPage = () => {
    setNum(prev => ++prev);
  };

  const onSubmit = () => {
    console.log('data', data)
  }

  const pages = {
    1: <Welcome nextPage={nextPage} />,
    2: <Name nextPage={nextPage} data={data} changeData={changeData} />,
    3: <Password nextPage={onSubmit} data={data} changeData={changeData} />,
  };

  return <main className='center'>{pages[num as keyof typeof pages]}</main>;
};
