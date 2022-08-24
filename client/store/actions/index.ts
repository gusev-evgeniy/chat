import { AppDispatch, RootState } from '..';
import { socket } from '../../api/socket';
import { Message } from '../../type/messages';
import { EVENTS } from '../../utils/constants';
import { addMessage, setAllReadedMessages } from '../slices/messages';
import { setUnreadedCount, updateLastMessage } from '../slices/rooms';

export const newMessageHandler = (message: Message) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { rooms, user } = getState();
  const { selected } = rooms || {};
  
  const extendedMessage = {...message, isMy: message.author.id === user.data?.id};

    if (selected === extendedMessage.roomId) {
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
  const { rooms } = getState();
  const { selected } = rooms || {};

  if (selected === roomId) {
    dispatch(setAllReadedMessages());
  }
};
