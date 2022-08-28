import { AppDispatch } from '..';
import { instance } from '../../api';
import { defaultUser } from '../slices/user';

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    const response = await instance.post('/user/logout');
    console.log('response', response);
    dispatch(defaultUser());
  } catch (error) {}
};
