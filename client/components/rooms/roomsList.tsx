import React, { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getRoomsInfo } from 'store/selectors';

import { Room } from './item';
import { Empty } from 'styles';
import { selectRoom } from 'store/slices/rooms';

export const RoomsList: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { me, rooms, typing, selected, filter } = useAppSelector(getRoomsInfo);


  const onSelecteHandler = useCallback((id: string) => {
    dispatch(selectRoom(id));
  }, []);

  if (!!filter && !rooms.length) {
    return <Empty margin='96%'>Rooms not found</Empty>;
  }

  if (!rooms.length) {
    return <Empty margin='96%'>Your rooms will be displayed here</Empty>;
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
          typing={typing[room.id]}
        />
      ))}
    </>
  );
};
