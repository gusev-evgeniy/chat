import { AppDispatch, RootState } from '..';
import { instance } from '../../api';
import { socket } from '../../api/socket';
import { Message } from '../../type/messages';
import { Room } from '../../type/room';
import { EVENTS, NEW_ROOM } from '../../utils/constants';
import { openCreateRoom } from '../slices/createRoom';
import { addMessage, setAllReadedMessages } from '../slices/messages';
import { addRoom, selectRoom, setUnreadedCount, updateLastMessage } from '../slices/rooms';

export const newMessageHandler = (message: Message) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { rooms, user } = getState();
  const extendedMessage = {...message, isMy: message.author.id === user.data?.id};

    if (rooms.selected === extendedMessage.roomId) {
      dispatch(addMessage(extendedMessage));
    }
    dispatch(updateLastMessage(extendedMessage));

    if (!extendedMessage.isMy) {
      const room = rooms.data.find(({ id }) => id === extendedMessage.roomId);
      dispatch(
        setUnreadedCount({ roomId: extendedMessage.roomId, count: (room?.unreadedMessagesCount as number) + 1 })
      );
    }
  };

export const readedHandler = (roomId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { rooms: { selected } } = getState();

  if (selected === roomId) {
    dispatch(setAllReadedMessages());
  }
};

export const createRoom = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { createRoom: { checked, title, type }, user } = getState();
  const usersId = checked.map(({ id }) => id);

  socket.emit(EVENTS.ROOM.CREATE_GROUP, { author: user.data?.id, usersId, title, type }, (newRoom: Room) => {
    dispatch(addRoom(newRoom));
    dispatch(selectRoom(newRoom.id));
  });
};

export const openNewRoom = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { createRoom: { checked  } } = getState();

  try {
      const { data } = await instance.get(`/room/checkPrivate?user=${checked[0].id}`);
      console.log('data', data)
      if (data) dispatch(selectRoom(data.id));
      else dispatch(selectRoom(NEW_ROOM));
  } catch (error) {
  }
};

export const createPrivateRoom = (message: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { createRoom: { checked }, user } = getState();

  socket.emit(
    EVENTS.ROOM.CREATE_PRIVATE,
    { author: user.data?.id, userId: checked[0].id },
    ({ id }: { id?: string, message?: string }) => {
      if (!id) {
        return;
      } 
      
      dispatch(selectRoom(id));
      createMessage(id, message);
    }
  );
};

export const createMessage = (roomId: string, message: string) => {
  socket.emit(EVENTS.MESSAGE.MESSAGE_CREATE, { roomId, message });
};

export const readMessage = (id: string) => async (dispatch: AppDispatch) => {
  socket.emit(EVENTS.MESSAGE.READ, { roomId: id }, () => {
    dispatch(setUnreadedCount({ roomId: id, count: 0 }));
    dispatch(setAllReadedMessages());
  });
};

export const sendTyping = (isTyping: boolean) => async (_: AppDispatch, getState: () => RootState) => {
  const { user: { data }, rooms: { selected } } = getState();

  socket.emit(EVENTS.MESSAGE.TYPING, { user: data?.name, roomId: selected, isTyping });
}