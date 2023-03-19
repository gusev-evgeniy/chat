import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { Room, RoomsResponse } from 'types/room';
import { Message } from 'types/messages';
import { preparedRooms } from 'utils/room';
import { store } from '..';

export type Rooms = ReturnType<typeof preparedRooms>;

const initialState = {
  data: [] as Rooms,
  selected: null as string | null,
  filter: '',
  count: 0,
  findingMessages: [] as Rooms,
};
export type RoomsState = typeof initialState;

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRoomsData: (state, action: PayloadAction<RoomsResponse>) => {
      const myId = store.getState().user.data?.id as string;

      // state.data = action.payload.rooms;
      state.data = preparedRooms(action.payload.rooms, myId);
      state.count = action.payload.count;
    },
    selectRoom: (state, action: PayloadAction<RoomsState['selected']>) => {
      state.selected = action.payload;
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      const myId = store.getState().user.data?.id as string;

      if (!state.data.some(({ id }) => id === action.payload.id)) {
        const room = preparedRooms([action.payload], myId)[0];

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

        return {
          ...room,
          participants,
        };
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
    updateRoomDetails(state, action: PayloadAction<Partial<Room>>) {
      state.data = state.data.map(room =>
        room.id === action.payload.id ? { ...room, ...action.payload } : room
      );
    },
    deleteRoom(state, action: PayloadAction<string>) {
      state.data = state.data.filter(({ id }) => id !== action.payload);
      state.selected = null;
    },
    updateRoomsFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload.toLowerCase();
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
} = roomsSlice.actions;

export const roomsReducer = roomsSlice.reducer;
