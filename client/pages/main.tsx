import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Chat } from '../components/chat';
import { Contacts } from '../components/contacts';
import { useAppSelector } from '../store/hooks';
import { selectUserData } from '../store/slices/user';
import { MainWrapper } from '../styles';

const Main = () => {
  const router = useRouter();
  const me = useAppSelector(selectUserData);

  useEffect(() => {
    if (!me) router.push('/auth');
  }, [me, router]);

  return (
    <MainWrapper padding={0}>
      <Contacts />
      <Chat/>
    </MainWrapper>
  );
};

export default Main;
