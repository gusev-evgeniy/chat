import { AppDispatch, RootState } from '..';
import { instance } from '../../api';
import { updateRoomDetails } from '../slices/rooms';

export const updateRoomAva = (photo: File) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { rooms: { selected } } = getState();

  const formData = new FormData();
  formData.append('photo', photo); 
  formData.append('id', selected as string);

  try {
    const { data } = await instance.post('/room/update', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });

    dispatch(updateRoomDetails(data.room));
  } catch (error) {}
};
