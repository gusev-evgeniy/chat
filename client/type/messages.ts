import { UserBD } from './user';

export type Message = {
  author: UserBD;
  createdAt: string;
  id: string;
  readed: boolean;
  roomId: string;
  text: string;
  updatedAt: string;
  isMy: boolean;
};

export type MessagesResponse = {
  count: number;
  messages: Message[];
  roomId: string;
};

export type Typing = {
  user: string;
  roomId: string;
  isTyping: boolean;
}

export type RoomsTyping = {
  [key: string]: string[];
}