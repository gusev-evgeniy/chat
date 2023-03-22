import { useEffect, useInsertionEffect, useRef } from 'react';

import { socket } from 'api/socket';

import { newMessageHandler, readedHandler } from 'store/actions';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setTyping } from 'store/slices/messages';
import { updateRoomDetails, updateUserOnline } from 'store/slices/rooms';

import { EVENTS } from 'utils/constants';

import { Message, Typing } from 'types/messages';
import { Room } from 'types/room';
import { addNewRoom } from 'store/actions/rooms';
import { selectMyData } from 'store/selectors';

export const useSocketOn = () => {
  const dispatch = useAppDispatch();

  const me = useAppSelector(selectMyData);
  useEffect(() => {
    console.log("socket.connected", socket.connected)
    // if (!socket.connected) socket.connect();
    // socket.connect();
    socket.on(EVENTS.MESSAGE.RESPONSE_TYPING, (obj: Typing) => {
      dispatch(setTyping(obj));
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
      console.log('7777777');
      dispatch(newMessageHandler(message));
    });

    return () => {
      console.log('disconnect');

      socket.disconnect();
    };
  }, []);
};
