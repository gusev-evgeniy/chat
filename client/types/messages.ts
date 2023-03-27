import { UserBD } from './user';

export type Message = {
  author?: UserBD;
  createdAt: string;
  id: string;
  readed: boolean;
  roomId: string;
  text: string | null;
  updatedAt: string;
  isMy?: boolean;
  authorId?: string;
  isSystem: boolean;
  attachment: MessageAttachment;
  media: string | null;
};

export type RoomResponse = {
  count: number;
  messages: Message[];
  roomId: string;
};

export type Typing = {
  user: string;
  roomId: string;
  isTyping: boolean;
};

export type RoomsTyping = {
  [key: string]: string[];
};

export type NewMessage = {
  file?: FileType;
  message?: string;
  media?: File;
};

export type FileType = {
  name: string;
  size: number;
  type: string;
  content: File;
};

export type MessageAttachment = FileType & { id: string };
