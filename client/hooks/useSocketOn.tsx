import { useInsertionEffect } from 'react'
import { socket } from '../api/socket';
import { newMessageHandler, readedHandler } from '../store/actions';
import { useAppDispatch } from '../store/hooks';
import { setTyping } from '../store/slices/messages';
import { addRoom, updateRoomDetails, updateUserOnline } from '../store/slices/rooms';
import { Message, Typing } from '../type/messages';
import { Room } from '../type/room';
import { EVENTS } from '../utils/constants';

export const useSocketOn = () => {
  const dispatch = useAppDispatch();
  
  useInsertionEffect(() => {
    socket.on(EVENTS.MESSAGE.RESPONSE_TYPING, (obj: Typing) => {
      dispatch(setTyping(obj));
    });

    socket.on(EVENTS.USER.ENTER, ({ userId }: { userId: string }) => {
      dispatch(updateUserOnline({ userId, online: true }));
    });

    socket.on(EVENTS.USER.LEAVE, ({ userId, wasOnline }: { userId: string; wasOnline: string }) => {
      dispatch(updateUserOnline({ userId, online: false, wasOnline }));
    });

    socket.on(EVENTS.ROOM.CREATED, room => {
      console.log('created11111111!!!!!!')
      socket.emit(EVENTS.ROOM.JOIN, { roomId: room.id });
      dispatch(addRoom(room));
    });

    socket.on(EVENTS.ROOM.UPDATED, (room: Room ) => {
      dispatch(updateRoomDetails(room));
    });

    socket.on(EVENTS.MESSAGE.READED, ({ roomId }) => dispatch(readedHandler(roomId)));

    socket.on(EVENTS.MESSAGE.NEW_MESSAGE_CREATED, (message: Message) => {
      dispatch(newMessageHandler(message));
    });

    return () => {
      socket.disconnect();
    };
  }, []);
}
