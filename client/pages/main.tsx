import React, { useState } from 'react';
import { Chat } from '../components/chat';
import { Rooms } from '../components/rooms';
import { NewRoom } from '../components/createRoom';
import { useAppSelector } from '../store/hooks';
import { selectMyData, setUserData } from '../store/slices/user';
import { MainWrapper } from '../styles';
import { instance } from '../api';
import { wrapper } from '../store';
import { selectRooms, setRoomsData } from '../store/slices/rooms';
import axios from 'axios';

const Main = () => {
  const [newRoomIsOpen, setNewRoomIsOpen] = useState(false);
  console.log('render111');
  const me = useAppSelector(selectMyData);
  const rooms = useAppSelector(selectRooms);

  const toggleNewRoom = (isOpen: boolean) => {
    setNewRoomIsOpen(isOpen);
  };

  return (
    <MainWrapper padding={0}>
      <Rooms
        toggleNewRoom={toggleNewRoom}
        isOpen={newRoomIsOpen}
        myId={me?.id as string}
        {...rooms}
        typing={[]}
      />

      {newRoomIsOpen ? <NewRoom setNewRoomIsOpen={setNewRoomIsOpen} /> : <Chat selected={rooms.selected} />}
    </MainWrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
  try {
    console.log('1111rooms');

    axios.defaults.headers.get.Cookie = req.headers.cookie as string;
    const { data } = await axios.get('http://localhost:5050/user/me');
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
