import { socket } from '@/api/socket';

import { EVENTS, NEW_ROOM } from '@/utils/constants';

import { addNewMessage, setAllReadedMessages } from '@/store/slices/messages';
import {
  selectRoom,
  setUnreadedCount,
  updateLastMessage,
} from '@/store/slices/rooms';

import { AppDispatch, RootState } from '@/store';

import { Message, NewMessage } from '@/types/messages';
import { Room } from '@/types/room';
import { createRoomsDefault } from '@/store/slices/createRoom';
import { addNewRoom } from './rooms';
import { createMessage } from '@/utils/message';

export const newMessageHandler =
  (message: Message) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      rooms: { selected, data },
      user,
    } = getState();

    const extendedMessage = {
      ...message,
      isMy: message.authorId === user.data?.id,
    };
    dispatch(addNewMessage(extendedMessage));
    dispatch(
      updateLastMessage({
        ...extendedMessage,
        readed: selected === extendedMessage.roomId,
      })
    );

    if (!extendedMessage.isMy) {
      const { unreadedMessagesCount } =
        data.find(({ id }) => id === extendedMessage.roomId) || {};
      const count = unreadedMessagesCount ? unreadedMessagesCount + 1 : 1;

      dispatch(setUnreadedCount({ roomId: extendedMessage.roomId, count }));
    }
  };

export const readedHandler =
  (roomId: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      rooms: { selected },
    } = getState();

    if (selected === roomId) {
      dispatch(setAllReadedMessages(roomId));
    }
  };

export const createRoom =
  (photo?: File | null) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      createRoom: { checked, title, type, background },
    } = getState();
    const users = checked.map(({ id, socketId }) => ({ id, socketId }));

    socket.emit(EVENTS.ROOM.CREATE, { users, title, type, photo, background }, (newRoom: Room) => {
      dispatch(addNewRoom(newRoom));
      dispatch(selectRoom(newRoom.id));
      dispatch(createRoomsDefault());
    });
  };

export const openNewRoom =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      createRoom: { checked },
      rooms: { data },
    } = getState();

    const room = data.find(
      ({ type, participants }) =>
        type === 'private' &&
        participants.some(({ id }) => id === checked[0].id)
    );

    dispatch(selectRoom(room ? room.id : NEW_ROOM));
  };

export const createPrivateRoom =
  (data: NewMessage) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      rooms: { newPrivateRoom }
    } = getState();

    const { participants, type } = newPrivateRoom;

    socket.emit(
      EVENTS.ROOM.CREATE,
      { users: participants, type },
      (room: any) => {
        createMessage(room.id, data)
        dispatch(addNewRoom(room));
        dispatch(selectRoom(room.id));
        dispatch(createRoomsDefault());
      }
    );
  };

export const readMessage = (id: string) => async (dispatch: AppDispatch) => {
  socket.emit(EVENTS.MESSAGE.READ, { roomId: id }, () => {
    dispatch(setUnreadedCount({ roomId: id, count: 0 }));
    dispatch(setAllReadedMessages(id));
  });
};

export const sendTyping =
  (isTyping: boolean, selected: string | null) => async (_: AppDispatch, getState: () => RootState) => {
    const {
      user: { data },
    } = getState();

    if ( !selected || selected === 'NEW_ROOM' || !data) {
      return;
    }

    socket.emit(EVENTS.MESSAGE.TYPING, {
      user: data.name,
      roomId: selected,
      isTyping,
    });
  };
