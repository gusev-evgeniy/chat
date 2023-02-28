import { AppDispatch } from 'store';
import { instance } from 'api';
import { defaultUser } from 'store/slices/user';

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await instance.post('/user/logout');
    dispatch(defaultUser());
  } catch (error) {}
};
