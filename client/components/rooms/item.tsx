import React, { FC, memo, useMemo } from 'react';
import dayjs from 'dayjs';

import { Typing } from '../../type/messages';
import { Room as RoomType, SelectedRoom } from '../../type/room';
import { UserBD } from '../../type/user';
import { returnTypingText } from '../../utils/message';
import { Avatar } from '../avatar';
import { StyledRoom } from './styled';

type Props = {
  room: RoomType;
  myId: string;
  isSelected: boolean;
  selectRoom: (selectedRoom: SelectedRoom) => void;
  toggleNewRoom: (isOpen: boolean) => void;
  typing: Typing;
  getMessages: (roomId: string) => void;
};

type RoomInfo = {
  id: string;
  title: string;
  image: string | null;
  online: boolean;
};

export const Room: FC<Props> = memo(
  ({ typing, myId, isSelected, selectRoom, toggleNewRoom, getMessages, room }) => {

    const { participants, id: roomId, type, title: roomTitle, lastMessage } = room || {};
    const { createdAt, text } = lastMessage || {};
    const time = dayjs(createdAt).format('HH:mm');
    console.log('Room render')
    const { image, title, id, online } = useMemo<RoomInfo>(() => {
        if (type === 'group') {
          return { image: null, title: roomTitle as string, id: roomId, online: false };
        }

        const { id, name, photo, online } = participants.find(({ id }) => id !== myId) as UserBD;
        return { id, title: name, image: photo, online };
      }, [room]) || {};

      const typingText = useMemo(() => returnTypingText(typing, type), [typing, type]);

    const onSelecteHandler = () => {
      toggleNewRoom(false);
      if (isSelected) {
        return;
      }

      getMessages(roomId);
      selectRoom({ name: title, roomId, userId: id, type });
    };

    return (
      <StyledRoom selected={isSelected} onClick={onSelecteHandler}>
        <Avatar name={title} photo={image} size={50} online={online} />
        <div className='data'>
          <div className='info'>
            <p className='name bold'>{title}</p>
            <div className='time'>
              <div className='icon' />
              {time}
            </div>
          </div>
          <p className='last_message'>{!!typingText ? typingText : text}</p>
        </div>
      </StyledRoom>
    );
  }
);

Room.displayName = 'Room';
