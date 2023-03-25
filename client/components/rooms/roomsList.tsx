import React, { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getRoomsInfo } from 'store/selectors';

import { Room } from './item';
import { selectRoom } from 'store/slices/rooms';
import { returnTypingText } from 'utils/message';
import { StyledWarning } from './styles';
import { openSideMenu } from 'store/slices/sideMenu';
import { Empty } from 'styles/index';

type Props = {
  isSideMenu: boolean;
};

export const RoomsList: FC<Props> = ({ isSideMenu }) => {
  const dispatch = useAppDispatch();
  const { me, rooms, selected, filter } = useAppSelector(getRoomsInfo);

  const onSelecteHandler = useCallback((id: string) => {
    dispatch(selectRoom(id));

    if (isSideMenu) {
      dispatch(openSideMenu());
    }
  }, []);

  if (!!filter && !rooms.length) {
    return <StyledWarning>Rooms not found</StyledWarning>;
  }

  if (!rooms.length && isSideMenu) {
    return <Empty margin='30%'>Your rooms will be displayed here</Empty>;
  }

  return (
    <>
      {rooms.map(room => (
        <Room
          key={room.id}
          room={room}
          myId={me?.id as string}
          isSelected={selected === room.id}
          onSelecteHandler={onSelecteHandler}
          typingText={returnTypingText(room)}
        />
      ))}
    </>
  );
};
