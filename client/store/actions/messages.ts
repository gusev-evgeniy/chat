import { AppDispatch, RootState } from "..";
import { instance } from "../../api";
import { setMessagesData } from "../slices/messages";

export const getMessages = (roomId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { rooms: { selected } } = getState();

  if (selected === roomId) {
    return;
  }

  try {
    const { data } = await instance.get(`message/?roomId=${roomId}`);
    console.log('data', data)
    dispatch(setMessagesData(data));
  } catch (error) {}
}