import { socket } from 'api/socket';

import { EVENTS, NEW_ROOM } from 'utils/constants';

import { addMessage, setAllReadedMessages } from 'store/slices/messages';
import {
  selectRoom,
  setUnreadedCount,
  updateLastMessage,
} from 'store/slices/rooms';

import { AppDispatch, RootState } from 'store';

import { Message, NewMessage } from 'types/messages';
import { Room } from 'types/room';
import { createRoomsDefault } from 'store/slices/createRoom';
import { addNewRoom } from './rooms';

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
    dispatch(addMessage(extendedMessage));
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
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      createRoom: { checked, title, type },
    } = getState();
    const users = checked.map(({ id, socketId }) => ({ id, socketId }));

    socket.emit(EVENTS.ROOM.CREATE, { users, title, type }, (newRoom: Room) => {
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
      createRoom: { checked, type },
    } = getState();

    socket.emit(
      EVENTS.ROOM.CREATE,
      { users: checked, type },
      (room: any) => {
        dispatch(createMessage(room.id, data));
        dispatch(addNewRoom(room));
        dispatch(selectRoom(room.id));
        dispatch(createRoomsDefault());
      }
    );
  };

export const createMessage =
  (roomId: string, messageData: NewMessage) =>
  (_: any, getState: () => RootState) => {
    const { messages } = getState();

    const { count = 0 } = messages.data[roomId] || {};

    const data = { ...messageData, serialNum: count + 1 };

    socket.emit(EVENTS.MESSAGE.CREATE, { roomId, data });
  };

export const readMessage = (id: string) => async (dispatch: AppDispatch) => {
  socket.emit(EVENTS.MESSAGE.READ, { roomId: id }, () => {
    dispatch(setUnreadedCount({ roomId: id, count: 0 }));
    dispatch(setAllReadedMessages(id));
  });
};

export const sendTyping =
  (isTyping: boolean) => async (_: AppDispatch, getState: () => RootState) => {
    const {
      user: { data },
      rooms: { selected },
    } = getState();

    socket.emit(EVENTS.MESSAGE.TYPING, {
      user: data?.name,
      roomId: selected,
      isTyping,
    });
  };
