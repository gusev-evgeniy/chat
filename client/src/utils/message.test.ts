import { Rooms } from 'store/slices/rooms';
import {
  convertSecondsToMinutesAndSeconds,
  getLastMessageText,
  returnTypingText,
} from './message';
import { Message, MessageAttachment } from 'types/messages';

type TestMessage = Omit<Message, 'author'>;

describe('returnTypingText', () => {
  test('when openRoom is undefined, it should return an empty string', () => {
    const openRoom = undefined;
    const result = returnTypingText(openRoom);
    expect(result).toBe('');
  });

  let defaultRoom: Rooms[0] = {
    image: 'room-image',
    title: 'room-title',
    online: true,
    participantId: 'participant-id',
    background: 'room-background',
    id: 'room-id',
    participants: [],
    type: 'group',
    lastMessage: null,
    unreadedMessagesCount: 0,
    typing: [],
  };

  test('when openRoom has no typing, it should return an empty string', () => {
    const result = returnTypingText(defaultRoom);
    expect(result).toBe('');
  });

  test('when openRoom is private, it should return the string "...typing"', () => {
    let openRoom: Rooms[0] = {
      ...defaultRoom,
      typing: ['user-1'],
      type: 'private',
    };
    const result = returnTypingText(openRoom);
    expect(result).toBe('...typing');
  });

  test('when openRoom has typing, it should return the typing array joined with commas and prefixed by the "typing" string', () => {
    const openRoom: Rooms[0] = { ...defaultRoom, typing: ['user-1', 'user-2'] };
    const result = returnTypingText(openRoom);
    expect(result).toBe('...user-1, user-2 typing');
  });
});

describe('convertSecondsToMinutesAndSeconds', () => {
  test('конвертация 0 секунд в строку "00:00"', () => {
    expect(convertSecondsToMinutesAndSeconds(0)).toEqual('00:00');
  });

  test('конвертация менее чем 1 минуты в формат "mm:ss"', () => {
    expect(convertSecondsToMinutesAndSeconds(59)).toEqual('00:59');
  });

  test('конвертация более чем 1 минуты в формат "mm:ss"', () => {
    expect(convertSecondsToMinutesAndSeconds(90)).toEqual('01:30');
  });

  test('конвертация большого числа секунд в формат "mm:ss"', () => {
    expect(convertSecondsToMinutesAndSeconds(3727)).toEqual('62:07');
  });
});

const defaultMessage: TestMessage = {
  id: 'msg-id',
  roomId: 'room-id',
  createdAt: '2022-01-01T00:00:00.000Z',
  updatedAt: '2022-01-01T00:00:00.000Z',
  readed: true,
  isSystem: false,
  text: 'Hello, this is a message',
  attachment: null,
  media: null,
};

describe('getLastMessageText', () => {
  test('when message is null, it should return an empty string', () => {
    const message = null;
    const result = getLastMessageText(message);
    expect(result).toBe('');
  });

  test('when message is a text message, it should return the text itself', () => {
    const result = getLastMessageText(defaultMessage);
    expect(result).toBe('Hello, this is a message');
  });

  test('when message is a system message, it should return the message text', () => {
    const text = 'System message';
    const message: TestMessage = { ...defaultMessage, isSystem: true, text };

    const result = getLastMessageText(message);
    expect(result).toBe('System message');
  });

  test('when message is an attachment, it should return the attachment name', () => {
    const name = 'attachment-name';
    const message: TestMessage = {
      ...defaultMessage,
      attachment: { name } as MessageAttachment,
    };

    const result = getLastMessageText(message);
    expect(result).toBe(name);
  });

  test('when message is a voice message, it should return the string "Voice message"', () => {
    const message: TestMessage = { ...defaultMessage, media: 'media' };

    const result = getLastMessageText(message);
    expect(result).toBe('Voice message');
  });
});

export {};
