import React, { FC } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getHeaderInfo } from '@/store/selectors';
import { openDialog } from '@/store/slices/dialog';

import { StyledGroupSubstring } from '@/components/chat/styles';
import { getGroupSubstring } from '@/utils/room';
import { PrivateSubstring } from './privateSubstring';

export const UserInfo: FC<{}> = ({}) => {
  const dispatch = useAppDispatch();

  const { online, type, participants, privateUser } = useAppSelector(getHeaderInfo) || {};

  const openDialogHandler = () => {
    dispatch(openDialog('GROUP_INFO'));
  };

  if (online) {
    return <p className='online'>online</p>;
  }

  if (type === 'private') {
    return <PrivateSubstring time={privateUser?.wasOnline}/>
  }

  return (
    <>
      <StyledGroupSubstring onClick={openDialogHandler}>
        {getGroupSubstring(participants)}
      </StyledGroupSubstring>
    </>
  );
};
