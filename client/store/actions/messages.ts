import { AppDispatch, RootState } from "..";
import { instance } from "../../api";
import { setMessagesData } from "../slices/messages";

export const getMessages = (skip = 0) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { rooms: { selected } } = getState();
  if (!selected) {
    return;
  }

  try {
    const { data } = await instance.get(`message/?roomId=${selected}&skip=${skip}`);
    dispatch(setMessagesData({ ...data, roomId: selected }));
  } catch (error) {}
}