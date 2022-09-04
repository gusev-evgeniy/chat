import { useInsertionEffect } from 'react'
import { socket } from '../api/socket';
import { newMessageHandler, readedHandler } from '../store/actions';
import { useAppDispatch } from '../store/hooks';
import { acceptCall, receiveUser } from '../store/slices/call';
import { openDialog } from '../store/slices/dialog';
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

    socket.on(EVENTS.CALL.GET, ({ from, signal }) => {
      console.log('from', from)
      dispatch(receiveUser({ from, signal }));
      dispatch(openDialog('RECEIVE_CALL'));
    })

    socket.on(EVENTS.CALL.ENDED, ({ message }) => {
      // dispatch(receiveUser({ from, signal }));
      dispatch(newMessageHandler(message));
      dispatch(openDialog(null));
    })

    socket.on(EVENTS.CALL.ACCEPTED, ({ signal }) => {
      console.log('ACCEPTED', signal)
      dispatch(acceptCall({ signal }))
    })


    return () => {
      socket.disconnect();
    };
  }, []);
}
