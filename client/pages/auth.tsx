import axios from 'axios';
import { useState } from 'react';

import { wrapper } from 'store';
import { setUserData } from 'store/slices/user';

import { useAuth } from 'hooks/useAuth';
import { useAuthGuard } from 'hooks/useAuthGuard';

import { Name } from 'components/auth/name';
import { Password } from 'components/auth/password';
import { Welcome } from 'components/auth/welcome';

const Auth = () => {
  useAuthGuard();
  const { changeData, data, onSubmit } = useAuth();

  const [num, setNum] = useState(1);

  const nextPage = () => setNum(prev => ++prev);

  const pages = {
    1: <Welcome nextPage={nextPage} />,
    2: <Name nextPage={nextPage} data={data} changeData={changeData} />,
    3: <Password nextPage={onSubmit} data={data} changeData={changeData} />,
  };

  return <main className='center'>{pages[num as keyof typeof pages]}</main>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ req }) => {
      try {
        if (!req.headers.cookie) {
          return {
            props: {},
          };
        }

        axios.defaults.headers.get.Cookie = req.headers.cookie;
        const { data } = await axios.get('http://localhost:5050/user/me');
        store.dispatch(setUserData(data));
        return {
          redirect: {
            destination: '/main',
            permanent: false,
          },
        };
      } catch (error) {
        return {
          props: {},
        };
      }
    }
);

export default Auth;
