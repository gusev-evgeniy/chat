import { instance } from 'api';
import { RoomResponse } from 'types/messages';

export const MessageAPI = {
  async get(roomId: string, skip = 0) {
    return await instance.get<Omit<RoomResponse, 'roomId' | 'participants'>>(
      `message/?roomId=${roomId}&skip=${skip}`
    );
  },

  async download(id: string) {
    return await instance.get(`/attachment/${id}`, { responseType: 'blob' });
  },
};
