import { Search } from '@/components/dialogs/createRoom/search';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { createRoomsDefault } from '@/store/slices/createRoom';
import { GrouptChat } from './grouptChat';

export const CreateRoom = () => {
  const dispatch = useAppDispatch();

  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prev => ++prev);

  useEffect(() => {
    return () => {
      dispatch(createRoomsDefault());
    };
  }, []);

  const pages = {
    1: <Search nextStep={nextStep} />,
    2: <GrouptChat />,
  };

  return <>{pages[step as keyof typeof pages]}</>;
};
