import React, { useEffect, useInsertionEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Resizable } from 'react-resizable';

import { Chat } from '../components/chat';
import { Rooms } from '../components/rooms';
import { NewRoom } from '../components/createRoom';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectMyData, setUserData } from '../store/slices/user';
import {
  addRoom,
  selectRooms,
  setRoomsData,
  updateLastMessage,
  updateUserOnline,
} from '../store/slices/rooms';
import { addMessage, selectTyping, startTyping, stopTyping } from '../store/slices/messages';
import { wrapper } from '../store';

import { socket } from '../api/socket';
import { MainWrapper } from '../styles';
import { Message, Typing } from '../type/messages';
import { EVENTS } from '../utils/constants';

const Main = () => {
  const [newRoomIsOpen, setNewRoomIsOpen] = useState(false);

  const me = useAppSelector(selectMyData);
  const rooms = useAppSelector(selectRooms);
  const typing = useAppSelector(selectTyping);

  const dispatch = useAppDispatch();

  const typingTimeoutId = useRef();

  const toggleNewRoom = (isOpen: boolean) => {
    setNewRoomIsOpen(isOpen);
  };

  useInsertionEffect(() => {
    //TODO. fix
    socket.on(EVENTS.MESSAGE.RESPONSE_TYPING, (obj: Typing) => {
      dispatch(startTyping(obj));
      clearInterval(typingTimeoutId.current);

      typingTimeoutId.current = setTimeout(() => {
        dispatch(stopTyping(obj));
      }, 2000);
    });

    socket.on(EVENTS.USER.ENTER, ({ userId }: { userId: string }) => {
      dispatch(updateUserOnline({ userId, online: true }));
    });

    socket.on(EVENTS.USER.LEAVE, ({ userId, wasOnline }: { userId: string; wasOnline: string }) => {
      dispatch(updateUserOnline({ userId, online: false, wasOnline }));
    });

    socket.on(EVENTS.MESSAGE.NEW_MESSAGE_CREATED, (obj: Message) => {
      dispatch(addMessage(obj));
      dispatch(updateLastMessage(obj));
      dispatch(stopTyping({ roomId: obj.roomId, user: obj.author.name }));

      if (obj.author.id === me?.id) {
        const messages = document.querySelector('.messages');
        if (messages) window.scrollTo(0, messages.scrollHeight);
      }
    });

    socket.on(EVENTS.ROOM.CREATED, obj => {
      dispatch(addRoom(obj));
    });
  }, []);

  const selectedRoomTyping = rooms.selected?.roomId ? typing[rooms.selected?.roomId] : [];

  return (
    <MainWrapper padding={0}>
      <Rooms
        toggleNewRoom={toggleNewRoom}
        isOpen={newRoomIsOpen}
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
      {newRoomIsOpen ? (
        <NewRoom setNewRoomIsOpen={setNewRoomIsOpen} />
      ) : (
        <Chat selected={rooms.selected} typing={selectedRoomTyping} />
      )}
    </MainWrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
  try {
    axios.defaults.headers.get.Cookie = req.headers.cookie as string;
    const { data } = await axios.get('http://localhost:5050/user/me');
    store.dispatch(setUserData(data));

    const rooms = await axios.get('http://localhost:5050/room/');
    store.dispatch(setRoomsData(rooms.data));
  } catch ({ response }: any) {
    // if (response.data.message === 'Unauthenticated') {
    //   return {
    //     redirect: {
    //       destination: '/auth',
    //       permanent: false,
    //     },
    //   };
    // }
  }
});

export default Main;
