import React, { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getRoomsInfo } from 'store/selectors';

import { Room } from './item';
import { Empty } from 'styles';
import { selectRoom } from 'store/slices/rooms';
import { returnTypingText } from 'utils/message';
import { StyledWarning } from './styles';

export const RoomsList: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { me, rooms, selected, filter } = useAppSelector(getRoomsInfo);

  const onSelecteHandler = useCallback((id: string) => {
    dispatch(selectRoom(id));
  }, []);

  if (!!filter && !rooms.length) {
    return <StyledWarning>Rooms not found</StyledWarning>;
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
