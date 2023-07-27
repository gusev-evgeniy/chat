import React, { memo, useMemo } from 'react';

import Portal from '@/components/portal';

import { useAppSelector } from '@/store/hooks';

import { GroupInfo } from './groupInfo';
import { CreateRoom } from './createRoom';

import { Call } from './call/call';
import { CallOffer } from './call/offer';
import { selectDialogName } from '@/store/selectors';

export const Dialog = memo(() => {
  const name = useAppSelector(selectDialogName);

  const dialog = useMemo(() => {
    switch (name) {
      case 'GROUP_INFO':
        return <GroupInfo />;
      case 'CALL':
        return <Call />;
      case 'CALL_OFFER':
        return <CallOffer />;
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
