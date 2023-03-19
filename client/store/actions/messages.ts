import { AppDispatch, RootState } from 'store';
import { instance } from 'api';
import { NEW_ROOM } from 'utils/constants';
import { setMessagesData } from 'store/slices/messages';
import { prepareFile } from 'utils/message';
import { createMessage, createPrivateRoom } from '.';
import { NewMessage } from 'types/messages';

export const getMessages =
  (skip = 0) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      rooms: { selected },
    } = getState();
    console.log('selected', selected)
    if (!selected || selected === NEW_ROOM) {
      return;
    }

    try {
      const { data } = await instance.get(
        `message/?roomId=${selected}&skip=${skip}`
      );
      console.log('data', data)
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
      dispatch(createMessage(selected, data));
    }
  };
