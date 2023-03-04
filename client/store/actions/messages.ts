import { AppDispatch, RootState } from 'store';
import { instance } from 'api';
import { BASE_URL, NEW_ROOM } from 'utils/constants';
import { setMessagesData } from 'store/slices/messages';
import { MessageAPI } from 'api/message';

export const getMessages =
  (skip = 0) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      rooms: { selected },
    } = getState();
    if (!selected || selected === NEW_ROOM) {
      return;
    }

    try {
      const { data } = await instance.get(
        `message/?roomId=${selected}&skip=${skip}`
      );
      dispatch(setMessagesData({ ...data, roomId: selected }));
    } catch (error) {}
  };