import axios from 'axios';
import { wrapper } from '../store';
import { setUserData } from '../store/slices/user';
import Auth from './auth';
import Main from './main';
import { useEffect } from 'react';

import { socket } from '../api/socket';

const Home = () => {
  useEffect(() => {
    
    //TODO. fix
    socket.on('ROOMS:TYPINGGGG', obj => {
      let typingTimeoutId;
      // setTyping(prev => [...prev, obj]);
      console.log('33333 F')
      clearInterval(typingTimeoutId);

      typingTimeoutId = setTimeout(() => {
        // setTyping(prev => prev.filter(prev => prev.user !== obj.user));
      }, 3000);
    });

    socket.on('ROOMS:NEW_MESSAGE_CREATED', obj => {
      console.log('NEW_MESSAGE_CREATED', obj);
    });

    return () => {
      console.log('disconnect!!!');
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Auth />
      <Main />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
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
