import React, { useEffect } from 'react';
import axios from 'axios';

import { Rooms } from '../components/rooms';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUserData } from '../store/slices/user';
import { setRoomsData } from '../store/slices/rooms';
import { wrapper } from '../store';

import { MainWrapper } from '../styles';
import { ChatWrapper } from '../components/chat/chatWrapper';
import { selectMyData } from '../store/selectors';
import { useRouter } from 'next/router';
import { Dialog } from '../components/dialog';
import { useSocketOn } from '../hooks/useSocketOn';

const Main = () => {
  const { id } = useAppSelector(selectMyData) || {};
  const { push } = useRouter();

  useSocketOn();

  useEffect(() => {
    !id && push('/auth');
  }, [id]);

  return (
    <MainWrapper padding={0}>
      <Dialog />
      <Rooms />
      <ChatWrapper />
    </MainWrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req }) => {
  try {
    const cookie = req.headers.cookie;

    if (!cookie) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        },
      };
    }

    axios.defaults.headers.get.Cookie = cookie as string;
    const { data } = await axios.get('http://localhost:5050/user/me');
    store.dispatch(setUserData(data));

    const rooms = await axios.get('http://localhost:5050/room/');
    store.dispatch(setRoomsData(rooms.data));
  } catch ({ response }: any) {
    if ((response as any)?.data.message === 'Unauthenticated') {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
});

export default Main;
