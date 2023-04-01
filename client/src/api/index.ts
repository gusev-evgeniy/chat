import axios from 'axios';
import { BASE_URL } from 'utils/constants';

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

