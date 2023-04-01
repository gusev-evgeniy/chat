import { addRoom } from "store/slices/rooms";
import { Room } from "types/room";
import { AppDispatch, RootState } from "..";

export const addNewRoom = (data: Room) => (dispatch: AppDispatch, getState: () => RootState) => {
  const { user } = getState();

  dispatch(addRoom({ data, myId: user.data?.id as string }))
}