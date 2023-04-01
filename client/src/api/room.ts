import { instance } from "api";
import { RoomsResponse } from "types/room";

export const RoomAPI = {
  async get() {
    return await instance.get<RoomsResponse>(`http://localhost:5050/room/'`);
  },
}