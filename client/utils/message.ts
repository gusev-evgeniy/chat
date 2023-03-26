import { MessageAPI } from 'api/message';
import { socket } from 'api/socket';
import dayjs from 'dayjs';
import { Rooms } from 'store/slices/rooms';
import { Message, NewMessage } from 'types/messages';
import { BASE_URL, EVENTS } from './constants';

export const returnTypingText = (openRoom: Rooms[0] | undefined) => {
  if (!openRoom) {
    return '';
  }

  const { typing, type } = openRoom;

  if (!typing || !typing.length) return '';
  if (type === 'private') return '...types';

  return `...${typing.join(',')} печатают`;
};

export const prepareFile = (content: File) => {
  const { name, size, type } = content;

  return {
    name,
    size,
    type,
    content,
  };
};

export const download = async (id: string) => {
  await MessageAPI.download(id);
  const address = `${BASE_URL}attachment/${id}`;

  const Id = `download-files`;
  let iframe = document.getElementById(Id);
  if (iframe === null) {
    iframe = document.createElement(`iframe`);
    iframe.style.display = `none`;
    iframe.id = Id;

    document.body.appendChild(iframe);
  }

  return ((iframe as HTMLImageElement).src = address);
};

export const getDay = (createdAt: string) =>
  dayjs(createdAt).format('YYYY-MM-DD');

export const convertSecondsToMinutesAndSeconds = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};

export const createMessage = (roomId: string, data: NewMessage) => {
  socket.emit(EVENTS.MESSAGE.CREATE, { roomId, data });
};

export const getLastMessageText = (message: Omit<Message, "author"> | null ) => {
  if (!message) return '';

  const { attachment, media, text, isSystem } = message;

  if (isSystem) return text;
  if (attachment) return attachment.name;
  if (media) return 'Voice message'

  return text;
}

export const validateFile = (file: File) => {
  return file.size <= 1e7;
}