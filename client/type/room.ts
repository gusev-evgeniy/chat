import { UserBD } from "./user";

export type Room = {
  createdAt: string;
  id: string;
  participants: UserBD[];
  title: null | string;
  type: 'private' | 'group';
  updatedAt: string;
};

export type RoomsResponse = {
  count: number;
  rooms: Room[];
};

export type SelectedRoom = {
  roomId: string | null;
  name: string;
  userId: string;
}

export type Typing = {
  roomId: string;
  user: string;
};