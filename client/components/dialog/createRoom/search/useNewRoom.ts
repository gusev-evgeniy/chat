import React, { useMemo } from 'react';

import { createRoom, openNewRoom } from 'store/actions';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCreatingRoom } from 'store/selectors';
import { checkUser, updateTitle } from 'store/slices/createRoom';
import { openDialog } from 'store/slices/dialog';

const MAX_LENGTH = 20;

export const useNewRoom = () => {
  const { checked, users, loaded, type, title } = useAppSelector(selectCreatingRoom);
  const isGroupChat = type === 'group';

  const dispatch = useAppDispatch();

  const onCheckHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const item = e.currentTarget.querySelector(
      '#user_checkbox'
    ) as HTMLInputElement;
    const id = e.currentTarget.getAttribute('data-id');

    if (item && id) dispatch(checkUser({ checked: !item.checked, id }));
  };

  const onRemoveUser = ({
    currentTarget,
  }: React.MouseEvent<HTMLDivElement>) => {
    const id = currentTarget.getAttribute('data-id');

    if (id) dispatch(checkUser({ checked: false, id }));
  };

  const createRoomHandler = async () => {
    if (isGroupChat) dispatch(createRoom());
    else dispatch(openNewRoom());

    dispatch(openDialog(null));
  };

  const groupNameLength = title.length;

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length < groupNameLength || groupNameLength < MAX_LENGTH) {
      dispatch(updateTitle({ title: value }));
    }
  };


  return useMemo(
    () => ({
      checked,
      users,
      loaded,
      isGroupChat,
      createRoomHandler,
      onRemoveUser,
      onCheckHandler,
      onChangeName,
      title
    }),
    [checked, users, loaded, isGroupChat, title]
  );
};
