import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { Room, RoomsResponse } from 'types/room';
import { Message, Typing } from 'types/messages';
import { prepareRooms } from 'utils/room';
import { UserBD } from 'types/user';

export type Rooms = ReturnType<typeof prepareRooms>;

type NewPrivateRoom = {
  participants: UserBD[];
  type: 'private';
  title: undefined;
};

const initialState = {
  data: [] as Rooms,
  selected: null as string | null,
  filter: '',
  count: 0,
  newPrivateRoom: {} as NewPrivateRoom,
};
export type RoomsState = typeof initialState;

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRoomsData: (
      state,
      action: PayloadAction<{ data: RoomsResponse; myId: string }>
    ) => {
      const { data, myId } = action.payload;

      state.data = prepareRooms(data.rooms, myId);
      state.count = data.count;
    },
    selectRoom: (state, action: PayloadAction<RoomsState['selected']>) => {
      state.selected = action.payload;
    },
    addRoom: (state, action: PayloadAction<{ data: Room; myId: string }>) => {
      const { data, myId } = action.payload;

      if (!state.data.some(({ id }) => id === data.id)) {
        const room = prepareRooms([data], myId)[0];

        state.data.unshift(room);
        state.count = state.count + 1;
      }
    },
    updateLastMessage: (state, action: PayloadAction<Message>) => {
      const { author, ...lastMessage } = action.payload;

      state.data = state.data.reduce((acc, curr) => {
        if (curr.id === action.payload.roomId)
          acc.unshift({ ...curr, lastMessage });
        else acc.push(curr);

        return acc;
      }, [] as Rooms);
    },
    updateUserOnline: (
      state,
      action: PayloadAction<{
        userId: string;
        online: boolean;
        wasOnline?: string;
      }>
    ) => {
      const { userId, online, wasOnline } = action.payload;
      state.data = state.data.map(room => {
        const participants = room.participants.map(user =>
          user.id === userId
            ? {
                ...user,
                online,
                wasOnline: wasOnline ? wasOnline : user.wasOnline,
              }
            : user
        );

        if (room.participantId === userId) {
          return { ...room, online, participants };
        }

        return {...room, participants};
      });
    },
    setUnreadedCount(
      state,
      action: PayloadAction<{ roomId: string; count: number }>
    ) {
      const { roomId, count } = action.payload;

      state.data = state.data.map(room => {
        if (room.id !== roomId) {
          return room;
        }

        const lastMessage =
          count === 0 && !!room.lastMessage
            ? { ...room.lastMessage, readed: true }
            : room.lastMessage;

        return {
          ...room,
          unreadedMessagesCount: count,
          lastMessage,
        };
      });
    },
    updateRoomDetails(
      state,
      action: PayloadAction<Omit<Room, 'lastMessage' | 'unreadedMessagesCount'>>
    ) {
      const { id, photo, title } = action.payload;
      state.data = state.data.map(room => {
        if (room.id === id) {
          return { ...room, image: photo, title };
        }
        return room;
      });
    },
    deleteRoom(state, action: PayloadAction<string>) {
      state.data = state.data.filter(({ id }) => id !== action.payload);
      state.selected = null;
    },
    updateRoomsFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload.toLowerCase();
    },
    updateTyping(state, action: PayloadAction<Typing>) {
      const { roomId, isTyping, user } = action.payload;

      state.data = state.data.map(room => {
        if (roomId !== room.id) {
          return room;
        }

        let typing = room.typing;
        const typingNow = room.typing.includes(user);

        if (isTyping && !typingNow) {
          typing = [...room.typing, user];
        }

        if (!isTyping && typingNow) {
          typing = room.typing.filter(id => id !== user);
        }

        return {
          ...room,
          typing,
        };
      });
    },
    clearTyping(state, action: PayloadAction<string>) {
      state.data = state.data.map(room => {
        const typingNow = room.typing.includes(action.payload);
        if (!typingNow) {
          return room;
        }

        return {
          ...room,
          typing: room.typing.filter(id => id !== action.payload),
        };
      });
    },
    addPrivateRoom(state, action: PayloadAction<UserBD[]>) {
      state.newPrivateRoom = {
        participants: action.payload,
        title: undefined,
        type: 'private',
      };
    },
    defaultRooms() {
      return initialState;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.rooms,
      };
    },
  },
});

export const {
  setRoomsData,
  selectRoom,
  addRoom,
  updateLastMessage,
  updateUserOnline,
  setUnreadedCount,
  updateRoomDetails,
  deleteRoom,
  updateRoomsFilter,
  updateTyping,
  clearTyping,
  addPrivateRoom,
  defaultRooms
} = roomsSlice.actions;

export const roomsReducer = roomsSlice.reducer;
