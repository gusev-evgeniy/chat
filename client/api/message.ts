import { instance } from "api";

export const MessageAPI = {
  async get() {

  },

  async download(id: string) {
    return await instance.get(`/attachment/${id}`, { responseType: 'blob' });
  }
}