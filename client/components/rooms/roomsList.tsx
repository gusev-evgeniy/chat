import React, { FC } from 'react';
import { useAppSelector } from 'store/hooks';
import { getRoomsInfo } from 'store/selectors';

import { Room } from './item';
import { Empty } from 'styles';

type Props = {
  onSelecteHandler: (id: string) => void;
};

export const RoomsList: FC<Props> = ({ onSelecteHandler }) => {
  const { me, rooms, typing, selected, filter } = useAppSelector(getRoomsInfo);

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
