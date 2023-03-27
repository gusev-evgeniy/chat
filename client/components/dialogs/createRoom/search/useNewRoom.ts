import { useAvatartPreview } from 'hooks/useAvatartPreview';
import React, { useState } from 'react';

import { createRoom, openNewRoom } from 'store/actions';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCreatingRoom, selectSideMenu } from 'store/selectors';
import { checkUser, updateTitle } from 'store/slices/createRoom';
import { openDialog } from 'store/slices/dialog';
import { addPrivateRoom } from 'store/slices/rooms';
import { openSideMenu } from 'store/slices/sideMenu';

const MAX_LENGTH = 20;

export const useNewRoom = () => {
  const dispatch = useAppDispatch();

  const { checked, users, loaded, type, title, background } =
    useAppSelector(selectCreatingRoom);
  const { isOpen: isSideMenuOpen } = useAppSelector(selectSideMenu);

  const isGroupChat = type === 'group';

  const [photo, setPhoto] = useState<File | null>(null);

  const { preview } = useAvatartPreview(photo);

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
    if (isGroupChat) {
      dispatch(createRoom(photo));
    } else {
      dispatch(addPrivateRoom(checked));
      dispatch(openNewRoom());
    }

    if (isSideMenuOpen) {
      dispatch(openSideMenu());
    }

    dispatch(openDialog(null));
  };

  const groupNameLength = title.length;

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length < groupNameLength || groupNameLength < MAX_LENGTH) {
      dispatch(updateTitle({ title: value }));
    }
  };

  return {
    checked,
    users,
    loaded,
    isGroupChat,
    createRoomHandler,
    onRemoveUser,
    onCheckHandler,
    onChangeName,
    title,
    setPhoto,
    preview,
    background,
  };
};
