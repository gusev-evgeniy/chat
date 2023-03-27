import React from 'react';
import axios from 'axios';

import { setUserData } from 'store/slices/user';
import { setRoomsData } from 'store/slices/rooms';
import { wrapper } from 'store';

import { CallProvider } from 'providers/call/callProvider';

import { useAuthGuard } from 'hooks/useAuthGuard';
import { useSocketOn } from 'hooks/useSocketOn';
import { useMediaQuery } from 'hooks/useMediaQuery';

import { Rooms } from 'components/rooms';
import { ChatWrapper } from 'components/chat/chatWrapper';
import { Dialog } from 'components/dialogs';
import { SideMenu } from 'components/sideMenu';

import { WIDTH } from 'styles/variables';
import { MainWrapper } from 'styles';
import { Error } from 'components/error';
import { UserAPI } from 'api/user';
import { RoomAPI } from 'api/room';

const Main = () => {
  useAuthGuard(false);

  const matches = useMediaQuery(`(min-width: ${WIDTH.MEDIUM})`);
  useSocketOn();

  return (
    <CallProvider>
      <MainWrapper>
        <Error />
        <Dialog />
        {matches ? <Rooms /> : <SideMenu />}
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
        const { data } = await UserAPI.me();
        store.dispatch(setUserData(data));

        const rooms = await RoomAPI.get();
        store.dispatch(setRoomsData({ data: rooms.data, myId: data.id }));
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
