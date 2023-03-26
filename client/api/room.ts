import { instance } from "api";

export const RoomAPI = {
  async getOne(id: string) {
    return await instance.get(`/room/${id}`);
  },
}