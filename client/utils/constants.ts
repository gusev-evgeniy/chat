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
    MESSAGE_CREATE: 'MESSAGE_CREATE',
    NEW_MESSAGE_CREATED: 'MESSAGE_CREATED',
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
