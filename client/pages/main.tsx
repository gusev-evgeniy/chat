import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Chat } from '../components/chat';
import { Contacts } from '../components/contacts';
import { NewRoom } from '../components/createRoom';
import { useAppSelector } from '../store/hooks';
import { selectUserData } from '../store/slices/user';
import { MainWrapper } from '../styles';

const Main = () => {
  const [newRoomIsOpen, setNewRoomIsOpen] = useState(false);

  const router = useRouter();
  const me = useAppSelector(selectUserData);

  const toggleNewRoom = () => {
    setNewRoomIsOpen(prev => !prev);
  }

  useEffect(() => {
    if (!me) router.push('/auth');
  }, [me, router]);

  return (
    <MainWrapper padding={0}>
      <Contacts toggleNewRoom={toggleNewRoom} newRoomIsOpen={newRoomIsOpen}/>
      {newRoomIsOpen ? <NewRoom /> : <Chat />}
    </MainWrapper>
  );
};

export default Main;
