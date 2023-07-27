import { instance } from '.';
import { UserBD } from '@/types/user';

type LoginData = {
  name: string;
  password: string
}

export const UserAPI = {
  async loging(data: LoginData) {
    return await instance.post<UserBD>(`/user/login`, data);
  },
  async auth(formData: FormData) {
    return await instance.post('/user/auth', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  },
  async checkName(name: string) {
    return await instance.post<{ message: string }>('/user/check_name', { name });
  },
  async me() {
    return await instance.get<UserBD>('http://localhost:5050/user/me');
  }
};
