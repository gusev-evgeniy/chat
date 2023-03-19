import { useCallback, useMemo } from 'react';

import { selectRoom } from 'store/slices/rooms';
import { useAppDispatch } from 'store/hooks';
import { openCreateRoom } from 'store/slices/createRoom';
import { logout } from 'store/actions/user';
import { openDialog } from 'store/slices/dialog';

import { useMediaQuery } from 'hooks/useMediaQuery';

import { WIDTH } from 'styles/variables';

export const useRooms = () => {
  const dispatch = useAppDispatch();

  const matches = useMediaQuery(`(max-width: ${WIDTH.MEDIUM})`);

  const toggleNewRoom = (toggle: boolean) => {
    if (matches) {
      return dispatch(openDialog('CREATE_ROOM'));
    }

    dispatch(openCreateRoom(toggle));
  };

  const onSelecteHandler = useCallback((id: string) => {
    toggleNewRoom(false);
    dispatch(selectRoom(id));
  }, []);

  const onExit = () => {
    dispatch(logout());
  };

  return useMemo(() => ({
    matches,
    onSelecteHandler,
    onExit,
  }), [matches])
}