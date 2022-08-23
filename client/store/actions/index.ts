import { AppDispatch, RootState } from '..';
import { socket } from '../../api/socket';
import { Message } from '../../type/messages';
import { EVENTS } from '../../utils/constants';
import { addMessage, setAllReadedMessages } from '../slices/messages';
import { setUnreadedCount, updateLastMessage } from '../slices/rooms';

export const newMessageHandler = (message: Message) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { rooms } = getState();
  const { selected } = rooms || {};

  if (selected?.id === message.roomId) {
    dispatch(addMessage(message));
  }

  const room = rooms.data.find(({ id }) => id === message.roomId);

  dispatch(updateLastMessage(message));
  dispatch(setUnreadedCount({ roomId: message.roomId, count: room?.unreadedMessagesCount as number + 1 }));
};

export const readedHandler = (roomId: string ) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { rooms } = getState();
  const { selected } = rooms || {};

  if (selected?.id === roomId) {
    dispatch(setAllReadedMessages())
  }
}