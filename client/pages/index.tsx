import axios from 'axios';

import { wrapper } from 'store';
import { setUserData } from 'store/slices/user';

import Auth from './auth';
import Main from './main';

const Home = () => {
  return (
    <>
      <Auth />
      <Main />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req }) => {
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
  } catch (error) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
});

export default Home;
