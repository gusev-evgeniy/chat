import React, { memo, useMemo } from 'react';
import Portal from '../portal';
import { useAppSelector } from '../../store/hooks';
import { selectDialog } from '../../store/slices/dialog';
import { GroupInfo } from './groupInfo';
import { Call } from './call';
import { ReceiveCall } from './call/receive';
import { CreateRoom } from './createRoom';

export const Dialog = memo(() => {
  const name = useAppSelector(selectDialog);

  const dialog = useMemo(() => {
    switch (name) {
      case 'GROUP_INFO':
        return <GroupInfo />;
      case 'CALL':
        return <Call />;
      case 'RECEIVE_CALL':
        return <ReceiveCall />;      
      case 'CREATE_ROOM':
        return <CreateRoom />;
      default:
        return null;
    }
  }, [name]);

  if (!dialog) {
    return null;
  }

  return <Portal type='dialog'>{dialog}</Portal>;
});

Dialog.displayName = 'Dialog';
