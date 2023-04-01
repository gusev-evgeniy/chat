import { UserBD } from './user';
import { Message } from './messages';

export type RoomType = 'private' | 'group';

export type Room<T = UserBD> = {
  createdAt: string;
  id: string;
  participants: T[];
  title:  string;
  type: RoomType;
  updatedAt: string;
  lastMessage: Omit<Message, 'author'> | null;
  unreadedMessagesCount: number;
  photo: null | string;
  background: string;
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

export type RoomMessages = {
  messages: Message[];
  count: number;
  loaded: boolean;
};

export type MessagesData = {
  [key: string]: RoomMessages;
}