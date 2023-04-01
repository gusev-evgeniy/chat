export const EVENTS = {
  ROOM: {
    CREATE: 'ROOM_CREATE',
    CREATED: 'ROOM_CREATED',
    JOIN: 'JOIN_ROOM',
    UPDATE: 'ROOM_UPDATE',
    LEAVE: 'ROOM_LEAVE',
    UPDATED: 'ROOM_UPDATED',
  } as const,

  MESSAGE: {
    TYPING: 'MESSAGE_TYPING',
    CREATE: 'MESSAGE_CREATE',
    CREATED: 'MESSAGE_CREATED',
    RESPONSE_TYPING: 'MESSAGE_SUBMIT_TYPING',
    READ: 'MESSAGE_READ',
    READED: 'MESSAGE_WAS_READ',
  } as const,

  USER: {
    ENTER: 'USER_ENTER',
    LEAVE: 'USER_LEAVE',
  } as const,

  CALL: {
    CALL: 'CALL',
    GET: 'GET_CALL',
    ACCEPT: 'ACCEPT_CALL',
    ACCEPTED: 'CALL_ACCEPTED',
    END: 'END_CALL',
    ENDED: 'CALL_ENDED',
  } as const,
} as const;

export type Events = typeof EVENTS;

export const NEW_ROOM = 'NEW_ROOM';

export const BASE_URL = `http://localhost:5050/`;

export const VALID_IMG_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
export const IMG_TYPES_TEXT_ERROR = `
Invalid file type.
Please select .jpg, .jpeg or .png file. 
`;
