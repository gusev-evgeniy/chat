import { AppDispatch, RootState } from 'store';
import { instance } from 'api';
import { NEW_ROOM } from 'utils/constants';
import { setMessagesData } from 'store/slices/messages';
import { createMessage, prepareFile } from 'utils/message';
import { createPrivateRoom } from '.';
import { NewMessage } from 'types/messages';

export const getMessages =
  (skip = 0) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      rooms: { selected },
    } = getState();

    if (!selected) {
      return;
    }
    
    try {
      const { data } = await instance.get(
        `message/?roomId=${selected}&skip=${skip}`
      );

      dispatch(setMessagesData({ ...data, roomId: selected }));
    } catch (error) {}
  };

export const uploadFile = (fileForUpload: File) => (dispatch: AppDispatch) => {
  const file = prepareFile(fileForUpload);
  dispatch(createMessageOrPrivateRoom({ file }));
};

export const createMessageOrPrivateRoom =
  (data: NewMessage) => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      rooms: { selected },
    } = getState();

    const isNewRoom = selected === NEW_ROOM;
    if (isNewRoom) {
      return dispatch(createPrivateRoom(data));
    }

    if (selected) {
      createMessage(selected, data);
    }
  };
