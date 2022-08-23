import { AppDispatch, RootState } from '..';
import { socket } from '../../api/socket';
import { Message } from '../../type/messages';
import { EVENTS } from '../../utils/constants';
import { addMessage } from '../slices/messages';
import { incrementUnreadedCount, updateLastMessage } from '../slices/rooms';

export const messageHandler = (message: Message) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { user, rooms } = getState();
  const { data } = user || {};
  const { selected } = rooms || {};

  if (message.author.id === data?.id) {
    dispatch(addMessage(message));
    return dispatch(updateLastMessage(message));
  }

  if (selected?.id === message.roomId) {
    socket.emit(EVENTS.MESSAGE.READ, { roomId: selected?.id });

    dispatch(addMessage({ ...message, readed: true }));
    return dispatch(updateLastMessage({ ...message, readed: true }));
  }

  dispatch(updateLastMessage(message));
  dispatch(incrementUnreadedCount(message.roomId));
};
