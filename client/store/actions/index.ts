import { AppDispatch, RootState } from '..';
import { socket } from '../../api/socket';
import { Message } from '../../type/messages';
import { Room } from '../../type/room';
import { EVENTS, NEW_ROOM } from '../../utils/constants';
import { addMessage, setAllReadedMessages } from '../slices/messages';
import { addRoom, selectRoom, setUnreadedCount, updateLastMessage } from '../slices/rooms';

export const newMessageHandler = (message: Message) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { rooms: { selected, data }, user } = getState();
  const extendedMessage = {...message, isMy: message.author.id === user.data?.id};

    dispatch(addMessage(extendedMessage));
    dispatch(updateLastMessage({ ...extendedMessage, readed: selected === extendedMessage.roomId }));

    if (!extendedMessage.isMy) {
      const { unreadedMessagesCount } = data.find(({ id }) => id === extendedMessage.roomId) || {};
      const count = unreadedMessagesCount ? unreadedMessagesCount + 1 : 1; 

      dispatch(
        setUnreadedCount({ roomId: extendedMessage.roomId, count })
      );
    }
  };

export const readedHandler = (roomId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { rooms: { selected } } = getState();

  if (selected === roomId) {
    dispatch(setAllReadedMessages(roomId));
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
  const { createRoom: { checked  }, rooms: { data } } = getState();
  //     // const { data } = await instance.get(`/room/checkPrivate?user=${checked[0].id}`);

  const room = data.find(({ type, participants }) => (
    type === 'private' && participants.some(({ id }) => id === checked[0].id)
  ))
    console.log('room', room)
  if (room) dispatch(selectRoom(room.id));
  else dispatch(selectRoom(NEW_ROOM));
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
    dispatch(setAllReadedMessages(id));
  });
};

export const sendTyping = (isTyping: boolean) => async (_: AppDispatch, getState: () => RootState) => {
  const { user: { data }, rooms: { selected } } = getState();

  socket.emit(EVENTS.MESSAGE.TYPING, { user: data?.name, roomId: selected, isTyping });
}
