import { UserBD } from './user';

export type Message = {
  author: UserBD;
  createdAt: string;
  id: string;
  readed: boolean;
  roomId: string;
  text: string;
  updatedAt: string;
};

export type MessagesResponse = {
  count: number;
  messages: Message[];
};