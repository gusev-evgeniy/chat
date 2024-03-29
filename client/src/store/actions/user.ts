import { AppDispatch } from '@/store';
import { instance } from '@/api';
import { defaultUser } from '@/store/slices/user';
import { defaultMessages } from '@/store/slices/messages';
import { defaultRooms } from '@/store/slices/rooms';

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await instance.post('/user/logout');
    dispatch(defaultUser());
    dispatch(defaultMessages());
    dispatch(defaultRooms());
  } catch (error) {}
};
