import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectUserData } from '../store/slices/user';

const Main = () => {
  const router = useRouter();
  const me = useAppSelector(selectUserData);

  useEffect(() => {
    if (!me) router.push('/auth');
  }, [me, router]);

  return <div>main</div>;
};

export default Main;
