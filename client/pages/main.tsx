import React, { useEffect, useInsertionEffect } from 'react';
import axios from 'axios';
// import { Resizable } from 'react-resizable';

import { Rooms } from '../components/rooms';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUserData } from '../store/slices/user';
import {
  addRoom,
  setRoomsData,
  updateUserOnline,
} from '../store/slices/rooms';
import { setTyping } from '../store/slices/messages';
import { wrapper } from '../store';

import { socket } from '../api/socket';
import { MainWrapper } from '../styles';
import { Message, Typing } from '../type/messages';
import { EVENTS } from '../utils/constants';
import { newMessageHandler, readedHandler } from '../store/actions';
import { ChatWrapper } from '../components/chat/chatWrapper';
import { selectMyData } from '../store/selectors';
import { useRouter } from 'next/router';

const Main = () => {
  const dispatch = useAppDispatch();

  const { id } = useAppSelector(selectMyData) || {};
  const { push } = useRouter();

  useInsertionEffect(() => {
    socket.on(EVENTS.MESSAGE.RESPONSE_TYPING, (obj: Typing) => {
      dispatch(setTyping(obj));
    });

    socket.on(EVENTS.USER.ENTER, ({ userId }: { userId: string }) => {
      dispatch(updateUserOnline({ userId, online: true }));
    });

    socket.on(EVENTS.USER.LEAVE, ({ userId, wasOnline }: { userId: string; wasOnline: string }) => {
      dispatch(updateUserOnline({ userId, online: false, wasOnline }));
    });

    socket.on(EVENTS.ROOM.CREATED, obj => {
      socket.emit(EVENTS.ROOM.JOIN, { roomId: obj.id });
      dispatch(addRoom(obj));
    });

    socket.on(EVENTS.MESSAGE.READED, ({ roomId }) => dispatch(readedHandler(roomId)));

    socket.on(EVENTS.MESSAGE.NEW_MESSAGE_CREATED, (message: Message) => {
      dispatch(newMessageHandler(message));
     });

     return () => {
      socket.disconnect();
    };

  }, []);
  console.log('id', id)

  useEffect(() => {
    !id && push('/auth')
  }, [id])

  return (
    <MainWrapper padding={0}>
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
    props: {}
  }
});

export default Main;
