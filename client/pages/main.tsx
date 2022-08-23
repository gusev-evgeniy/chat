import React, { useEffect, useInsertionEffect, useState } from 'react';
import axios from 'axios';
// import { Resizable } from 'react-resizable';

import { Chat } from '../components/chat';
import { Rooms } from '../components/rooms';
import { NewRoom } from '../components/createRoom';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectMyData, setUserData } from '../store/slices/user';
import {
  addRoom,
  incrementUnreadedCount,
  selectRooms,
  setRoomsData,
  updateLastMessage,
  updateUserOnline,
} from '../store/slices/rooms';
import { addMessage, selectTyping, setTyping } from '../store/slices/messages';
import { wrapper } from '../store';

import { socket } from '../api/socket';
import { MainWrapper } from '../styles';
import { Message, Typing } from '../type/messages';
import { EVENTS } from '../utils/constants';
import { openCreateRoom, selectCreatingRoom } from '../store/slices/createRoom';
import { messageHandler } from '../store/actions';

const Main = () => {
  const me = useAppSelector(selectMyData);
  const rooms = useAppSelector(selectRooms);
  const typing = useAppSelector(selectTyping);
  const createRoomData = useAppSelector(selectCreatingRoom);

  const dispatch = useAppDispatch();

  const toggleNewRoom = (isOpen: boolean) => {
    dispatch(openCreateRoom(isOpen));
  };

  useInsertionEffect(() => {
    //TODO. fix
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

    socket.on(EVENTS.MESSAGE.READED, obj => {
      // dispatch(readMessage())
    });

    socket.on(EVENTS.MESSAGE.NEW_MESSAGE_CREATED, (message: Message) => {
      dispatch(messageHandler(message));

      if (message.author.id === me?.id) {
        const messages = document.querySelector('.messages');
        if (messages) window.scrollTo(0, messages.scrollHeight);
      }
     });
  }, []);

  const selectedRoomTyping = rooms.selected?.id ? typing[rooms.selected?.id] : [];

  return (
    <MainWrapper padding={0}>
      <Rooms
        toggleNewRoom={toggleNewRoom}
        isOpen={createRoomData.open}
        myId={me?.id as string}
        {...rooms}
        typing={typing}
      />
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
      {createRoomData.open ? (
        <NewRoom setNewRoomIsOpen={toggleNewRoom} />
      ) : (
        <Chat selected={rooms.selected} typing={selectedRoomTyping} />
      )}
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
