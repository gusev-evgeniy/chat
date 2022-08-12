import React, { useEffect, useRef, useState } from 'react';
import { Chat } from '../components/chat';
import { Rooms } from '../components/rooms';
import { NewRoom } from '../components/createRoom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectMyData, setUserData } from '../store/slices/user';
import { MainWrapper } from '../styles';
import { instance } from '../api';
import { wrapper } from '../store';
import { addRoom, selectRooms, setRoomsData } from '../store/slices/rooms';
import axios from 'axios';
import { socket } from '../api/socket';
import { addMessage } from '../store/slices/messages';

const Main = () => {
  const [newRoomIsOpen, setNewRoomIsOpen] = useState(false);
  const [typing, setTyping] = useState([]);

  const me = useAppSelector(selectMyData);
  const rooms = useAppSelector(selectRooms);
  const dispatch = useAppDispatch();

  const typingTimeoutId = useRef();

  const toggleNewRoom = (isOpen: boolean) => {
    setNewRoomIsOpen(isOpen);
  };

  useEffect(() => {
    //TODO. fix
    socket.on('ROOMS:TYPINGGGG', obj => {
      setTyping(prev => [...prev, obj]);
      clearInterval(typingTimeoutId.current);

      typingTimeoutId.current = setTimeout(() => {
        setTyping(prev => prev.filter(prev => prev.user !== obj.user));
      }, 3000);
    });

    socket.on('ROOMS:NEW_MESSAGE_CREATED', obj => {
      dispatch(addMessage(obj));
    });

    socket.on('ROOMS:NEW_ROOM_CREATED', obj => {
      console.log('obj', obj);
      dispatch(addRoom(obj));
    });
  }, []);

  return (
    <MainWrapper padding={0}>
      <Rooms
        toggleNewRoom={toggleNewRoom}
        isOpen={newRoomIsOpen}
        myId={me?.id as string}
        {...rooms}
        typing={typing}
      />

      {newRoomIsOpen ? <NewRoom setNewRoomIsOpen={setNewRoomIsOpen} /> : <Chat selected={rooms.selected} typing={typing}/>}
    </MainWrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
  try {
    console.log('1111rooms');

    axios.defaults.headers.get.Cookie = req.headers.cookie as string;
    const { data } = await axios.get('http://localhost:5050/user/me');
    console.log('1111rooms', data);

    store.dispatch(setUserData(data));

    const rooms = await instance.get('room/');
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
