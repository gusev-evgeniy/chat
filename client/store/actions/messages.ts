import { AppDispatch, RootState } from "..";
import { instance } from "../../api";
import { setMessagesData } from "../slices/messages";

export const getMessages = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { rooms: { selected }, messages: { data } } = getState();
  
  if (!selected || data[selected]?.loaded) {
    return;
  }

  try {
    const { data } = await instance.get(`message/?roomId=${selected}`);
    console.log('data', data)
    dispatch(setMessagesData({ ...data, roomId: selected }));
  } catch (error) {}
}