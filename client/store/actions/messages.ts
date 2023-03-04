import { AppDispatch, RootState } from 'store';
import { instance } from 'api';
import { BASE_URL, NEW_ROOM } from 'utils/constants';
import { setMessagesData } from 'store/slices/messages';
import { MessageAPI } from 'api/message';
import { prepareFile } from 'utils/message';
import { createMessage, createPrivateRoom } from '.';

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

export const uploadFile =
  (fileForUpload: File) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      rooms: { selected },
    } = getState();

    if (!selected) {
      return;
    }

    const isNewRoom = selected === NEW_ROOM;

    const file = prepareFile(fileForUpload);

    if (isNewRoom) dispatch(createPrivateRoom({ file }));
    else createMessage(selected, { file });
  };
