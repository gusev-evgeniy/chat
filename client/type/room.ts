import { UserBD } from './user';
import { Message } from './messages';

export type RoomType = 'private' | 'group';

export type Room = {
  createdAt: string;
  id: string;
  participants: UserBD[];
  title: null | string;
  type: RoomType;
  updatedAt: string;
  lastMessage: Omit<Message, 'author'> | null;
  unreadedMessagesCount: number;
  photo: null | string;
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
};
