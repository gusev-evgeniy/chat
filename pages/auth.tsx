import { useState } from 'react';

import { Name } from '../components/auth/name';
import { Password } from '../components/auth/password';
import { Welcome } from '../components/auth/welcome';


export const Auth = () => {
  const [num, setNum] = useState(1);
  console.log('num', num)

  const nextPage = () => {
    setNum(prev => ++prev);
  }
  
  const pages = {
    1: <Welcome nextPage={nextPage} />,
    2: <Name nextPage={nextPage}/>,
    3: <Password nextPage={nextPage}/>,
  };

  return <main className='center'>{pages[num as keyof typeof pages]}</main>;
};
