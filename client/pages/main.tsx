import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Chat } from '../components/chat';
import { Rooms } from '../components/rooms';
import { NewRoom } from '../components/createRoom';
import { useAppSelector } from '../store/hooks';
import { selectMyData } from '../store/slices/user';
import { MainWrapper } from '../styles';
import { instance } from '../api';
import { wrapper } from '../store';
import { selectRooms, setRoomsData } from '../store/slices/rooms';
import { socket } from '../api/socket';
import { StyledAva } from '../components/auth/styles';
import { Typing } from '../type/room';

const Main = () => {
  const [newRoomIsOpen, setNewRoomIsOpen] = useState(false);
  const [typing, setTyping] = useState<Typing[]>([]);

  const router = useRouter();
  const me = useAppSelector(selectMyData);
  const rooms = useAppSelector(selectRooms);

  useEffect(() => {
    socket.connect();

    //TODO. fix
    socket.on('ROOMS:TYPING', obj => {
      let typingTimeoutId;
      setTyping(prev => [...prev, obj]);

      clearInterval(typingTimeoutId);

      typingTimeoutId = setTimeout(() => {
        setTyping(prev => prev.filter(prev => prev.user !== obj.user));
      }, 3000);
    });
    socket.on('ROOMS:CREATE', (obj: any) => {
      // socket.emit('ROOMS:SUBMIT', { dialogId: selected.roomId, user: me, message });
    });

    socket.on('ROOMS:SUBMIT', obj => {
      console.log('SUBMIT', obj);
    }); //TODO temp

    return () => {
      console.log('disconnect!!!');
      socket.disconnect();
    };
  }, []);

  const toggleNewRoom = (isOpen: boolean) => {
    setNewRoomIsOpen(isOpen);
  };

  useEffect(() => {
    if (!me) router.push('/auth');
  }, [me, router]);

  return (
    <MainWrapper padding={0}>
      <Rooms
        toggleNewRoom={toggleNewRoom}
        isOpen={newRoomIsOpen}
        myId={me?.id as string}
        {...rooms}
        typing={typing}
      />
      {newRoomIsOpen ? <NewRoom setNewRoomIsOpen={setNewRoomIsOpen} /> : <Chat selected={rooms.selected} />}

      {me && (
        <div>
          <StyledAva size={50} backgroundImage={me.photo} />
          <div>{me.name}</div>
          <div>{me.id}</div>
        </div>
      )}
    </MainWrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
  try {
    const { data } = await instance.get('room/');
    store.dispatch(setRoomsData(data));
    console.log('getServerSideProps');
  } catch (err: any) {
    console.log('getServerSideProps err', err);
    console.log('getServerSideProps err', err.data);
  }
  return {
    props: null,
  };
});

export default Main;
