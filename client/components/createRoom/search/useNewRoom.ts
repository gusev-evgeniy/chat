import React, { useMemo } from 'react';
import { createRoom, openNewRoom } from '../../../store/actions';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getSecetRoom } from '../../../store/selectors';
import { checkUser, openCreateRoom } from '../../../store/slices/createRoom';

export const useNewRoom = () => {
  const { checked, users, loaded, disabled, isGroupChat } =
    useAppSelector(getSecetRoom);

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

    dispatch(openCreateRoom(false));
  };

  return useMemo(
    () => ({
      checked,
      users,
      loaded,
      disabled,
      isGroupChat,
      createRoomHandler,
      onRemoveUser,
      onCheckHandler,
    }),
    [checked, users, loaded, disabled, isGroupChat]
  );
};
