import { UserBD } from "./user";

export type RoomType = 'private' | 'group';

export type Room = {
  createdAt: string;
  id: string;
  participants: UserBD[];
  title: null | string;
  type: RoomType;
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
  type: RoomType;
}

export type Typing = {
  roomId: string;
  user: string;
};