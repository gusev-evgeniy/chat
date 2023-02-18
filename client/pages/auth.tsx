import axios from 'axios';

import { setUserData } from '../store/slices/user';

import { Name } from '../components/auth/name';
import { Password } from '../components/auth/password';
import { Welcome } from '../components/auth/welcome';
import { wrapper } from '../store';
import { useAuthForm } from '../hooks/useAuthForm';
import { useAuthGuard } from '../hooks/useAuthGuard';

const Auth = () => {
  useAuthGuard();
  
  const { changeData, data, nextPage, num, onSubmit } = useAuthForm();

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
        axios.defaults.headers.get.Cookie = req.headers.cookie as string;
        const { data } = await axios.get('http://localhost:5050/user/me');
        store.dispatch(setUserData(data));
        return {
          redirect: {
            destination: '/main',
            permanent: false,
          },
        };
      } catch (error) {}

      return {
        props: {},
      };
    }
);

export default Auth;
