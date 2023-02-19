import { Socket } from "socket.io";
import User from "../entities/user";

export type GetTypingProps = {
  user: string;
  roomId: string;
  isTyping: boolean;
}

export type Callback = (...arg: any) => void;

export interface MySocket extends Socket {
  me: User;
}