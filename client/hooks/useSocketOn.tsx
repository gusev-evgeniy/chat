import { useInsertionEffect } from 'react'
import { socket } from '../api/socket';
import { newMessageHandler, readedHandler } from '../store/actions';
import { useAppDispatch } from '../store/hooks';
import { getAnswerSignal, receiveCall } from '../store/slices/call';
import { openDialog } from '../store/slices/dialog';
import { setTyping } from '../store/slices/messages';
import { addRoom, updateRoomDetails, updateUserOnline } from '../store/slices/rooms';
import { Message, Typing } from '../type/messages';
import { Room } from '../type/room';
import { UserBD } from '../type/user';
import { EVENTS } from '../utils/constants';
import Peer from 'simple-peer';

type GetCall = {
  from: UserBD;
  signal: Peer.SignalData;
}

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

    socket.on(EVENTS.CALL.GET, ({ from, signal }: GetCall) => {
      console.log('from111', from)
      console.log('signal2222', signal)
      // dispatch(receiveCall({ from, signal }));
      dispatch(openDialog('CALL'));
    })

    // socket.on(EVENTS.CALL.ENDED, ({ message }) => {
    //   // dispatch(receiveCall({ from, signal }));
    //   dispatch(newMessageHandler(message));
    //   dispatch(openDialog(null));
    // })

    socket.on(EVENTS.CALL.ACCEPTED, ({ signal }) => {
      console.log('ACCEPTED', signal)
      // dispatch(getAnswerSignal({ signal }))
    })

    return () => {
      socket.disconnect();
    };
  }, []);
}
