import React, { useInsertionEffect } from 'react';
import axios from 'axios';
// import { Resizable } from 'react-resizable';

import { Rooms } from '../components/rooms';

import { useAppDispatch } from '../store/hooks';
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

const Main = () => {
  const dispatch = useAppDispatch();

  useInsertionEffect(() => {
    //TODO. fix
    socket.on(EVENTS.MESSAGE.RESPONSE_TYPING, (obj: Typing) => {
      console.log('obj', obj)
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

      // if (extendedMessage.isMy) {
      //   const messages = document.querySelector('.messages');
      //   if (messages) window.scrollTo(0, messages.scrollHeight);
      // }
     });
  }, []);

  return (
    <MainWrapper padding={0}>
      <Rooms />
      {/* <Split
        sizes={[25, 75]}
        cursor='col-resize'
        expandToMin={false}
        gutterSize={10}
        direction='vertical'
      >
        <div>hello</div>
        <div>there</div>
      </Split> */}
      <ChatWrapper />
    </MainWrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
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
    if (response?.data.message === 'Unauthenticated') {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        },
      };
    }
  }
});

export default Main;
