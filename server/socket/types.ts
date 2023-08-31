import { Socket } from 'socket.io';
import User from '../entities/user';

export type GetTypingProps = {
  user: string;
  roomId: string;
  isTyping: boolean;
};

export type Callback = (...arg: any) => void;

export interface MySocket extends Socket {
  me: User;
}

export type RoomUserProps = { id: User; socketId: string };

export type RoomData = {
  title?: string;
  type?: string;
  photo?: Buffer;
  background?: string;
  users: RoomUserProps[];
};
