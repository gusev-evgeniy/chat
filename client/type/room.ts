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
