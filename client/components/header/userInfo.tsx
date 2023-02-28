import React, { FC } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getHeaderInfo } from 'store/selectors';
import { openDialog } from 'store/slices/dialog';

import { StyledGroupSubstring, StyledSubstring } from 'components/chat/styles';

export const UserInfo: FC<{}> = ({}) => {
  const dispatch = useAppDispatch();

  const { online, substring, type } = useAppSelector(getHeaderInfo) || {};

  const openDialogHandler = () => {
    dispatch(openDialog('GROUP_INFO'));
  };

  if (online) {
    return <p className='online'>online</p>;
  }

  if (type === 'private') {
    return <StyledSubstring>{substring}</StyledSubstring>;
  }

  return (
    <>
      <StyledGroupSubstring onClick={openDialogHandler}>
        {substring}
      </StyledGroupSubstring>
    </>
  );
};
