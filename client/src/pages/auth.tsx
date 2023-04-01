import axios from 'axios';

import { wrapper } from 'store';
import { setUserData } from 'store/slices/user';

import { useAuth } from 'hooks/useAuth';
import { useAuthGuard } from 'hooks/useAuthGuard';

import { Name } from 'components/auth/name';
import { Password } from 'components/auth/password';
import { Welcome } from 'components/auth/welcome';
import { UserAPI } from 'api/user';

const Auth = () => {
  useAuthGuard();
  const { changeData, data, submitHandler, changePage, num } = useAuth();

  const pages = {
    1: <Welcome changePage={changePage} />,
    2: <Name changePage={changePage} data={data} changeData={changeData} />,
    3: (
      <Password
        submitHandler={submitHandler}
        data={data}
        changeData={changeData}
        changePage={changePage}
      />
    ),
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
