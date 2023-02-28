import React from 'react';
import axios from 'axios';

import { setUserData } from 'store/slices/user';
import { setRoomsData } from 'store/slices/rooms';
import { wrapper } from 'store';

import { CallProvider } from 'providers/call/provider';

import { useAuthGuard } from 'hooks/useAuthGuard';
import { useSocketOn } from 'hooks/useSocketOn';
import { useMediaQuery } from 'hooks/useMediaQuery';

import { Rooms } from 'components/rooms';
import { ChatWrapper } from 'components/chat/chatWrapper';
import { Dialog } from 'components/dialog';
import { SideMenu } from 'components/sideMenu';

import { WIDTH } from 'styles/variables';
import { MainWrapper } from 'styles';

const Main = () => {
  useAuthGuard(false);

  const matches = useMediaQuery(`(min-width: ${WIDTH.MEDIUM})`);
  useSocketOn();

  return (
    <CallProvider>
      <MainWrapper>
        <Dialog />
        <SideMenu />
        {matches && <Rooms />}
        <ChatWrapper matches={matches} />
      </MainWrapper>
    </CallProvider>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ req }) => {
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
    }
);

export default Main;
