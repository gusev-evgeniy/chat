import React, { memo, useMemo } from 'react';
import Portal from './portal';
import { useAppSelector } from '../../store/hooks';
import { selectDialog } from '../../store/slices/dialog';
import { GroupInfo } from './groupInfo';

export const Dialog = memo(() => {
  const name = useAppSelector(selectDialog);

  const dialog = useMemo(() => {
    switch (name) {
      case 'GROUP_INFO':
        return <GroupInfo />;
      default:
        return null;
    }
  }, [name]);

  if (!dialog) {
    return null;
  }

  return <Portal>{dialog}</Portal>;
});

Dialog.displayName = 'Dialog';
