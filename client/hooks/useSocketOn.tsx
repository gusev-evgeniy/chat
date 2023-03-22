import { useEffect } from 'react';

import { socket } from 'api/socket';

import { newMessageHandler, readedHandler } from 'store/actions';
import { useAppDispatch } from 'store/hooks';
import { updateRoomDetails, updateTyping, updateUserOnline } from 'store/slices/rooms';

import { EVENTS } from 'utils/constants';

import { Message, Typing } from 'types/messages';
import { Room } from 'types/room';
import { addNewRoom } from 'store/actions/rooms';

export const useSocketOn = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on(EVENTS.MESSAGE.RESPONSE_TYPING, (obj: Typing) => {
      // dispatch(setTyping(obj));
      dispatch(updateTyping(obj))
    });

    socket.on(EVENTS.USER.ENTER, ({ userId }: { userId: string }) => {
      dispatch(updateUserOnline({ userId, online: true }));
    });

    socket.on(
      EVENTS.USER.LEAVE,
      ({ userId, wasOnline }: { userId: string; wasOnline: string }) => {
        dispatch(updateUserOnline({ userId, online: false, wasOnline }));
      }
    );

    socket.on(EVENTS.ROOM.CREATED, room => {
      socket.emit(EVENTS.ROOM.JOIN, { roomId: room.id });
      dispatch(addNewRoom(room));
    });

    socket.on(EVENTS.ROOM.UPDATED, (room: Room) => {
      dispatch(updateRoomDetails(room));
    });

    socket.on(EVENTS.MESSAGE.READED, ({ roomId }) =>
      dispatch(readedHandler(roomId))
    );

    socket.on(EVENTS.MESSAGE.CREATED, (message: Message) => {
      dispatch(newMessageHandler(message));
    });

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, [dispatch]);
};
