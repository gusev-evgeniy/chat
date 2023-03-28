import { AppDispatch, RootState } from 'store';
import { NEW_ROOM } from 'utils/constants';
import { addOffsetMessages, setMessagesData } from 'store/slices/messages';
import { createMessage, prepareFile, validateFile } from 'utils/message';
import { createPrivateRoom } from '.';
import { NewMessage } from 'types/messages';
import { setError } from 'store/slices/error';
import { MessageAPI } from 'api/message';

export const getRoomData =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      rooms: { selected },
    } = getState();

    if (!selected || selected === NEW_ROOM) {
      return;
    }

    try {
      const { data } = await MessageAPI.get(selected);
      dispatch(setMessagesData({ ...data, roomId: selected }));
    } catch (error: any) {
      dispatch(setError(error));
    }
  };

export const getMessages =
  (skip: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      rooms: { selected },
    } = getState();

    if (!selected || selected === NEW_ROOM) {
      return;
    }

    try {
      const { data } = await MessageAPI.get(selected, skip);
      dispatch(addOffsetMessages({ ...data, roomId: selected }));
    } catch (error: any) {
      dispatch(setError(error));
    }
  };

export const uploadFile = (fileForUpload: File) => (dispatch: AppDispatch) => {
  const isValid = validateFile(fileForUpload);
  if (!isValid) {
    return dispatch(setError('Maximum file size 1Mb'));
  }

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
