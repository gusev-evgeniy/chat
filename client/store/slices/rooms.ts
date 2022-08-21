import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { HYDRATE } from 'next-redux-wrapper';
import { Room, RoomsResponse } from '../../type/room';
import { Message } from '../../type/messages';

export interface RoomsState {
  data: Room[];
  selected: Room | null;
  count: number;
}

const initialState: RoomsState = {
  data: [],
  selected: null,
  count: 0,
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRoomsData: (state, action: PayloadAction<RoomsResponse>) => {
      state.data = action.payload.rooms;
      state.count = action.payload.count;
    },
    selectRoom: (state, action: PayloadAction<string>) => {
      const room = state.data.find(({ id }) => id === action.payload);
      if (room) state.selected = room;
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      if (!state.data.some(({ id }) => id === action.payload.id)) {
        state.data.unshift(action.payload);
        state.count = state.count + 1;
      }
    },
    updateLastMessage: (state, action: PayloadAction<Message>) => {
      const { author, ...lastMessage } = action.payload;

      state.data = state.data.map(room =>
        action.payload.roomId === room.id ? { ...room, lastMessage } : room
      );
    },
    updateUserOnline: (
      state,
      action: PayloadAction<{ userId: string; online: boolean; wasOnline?: string }>
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

export const { setRoomsData, selectRoom, addRoom, updateLastMessage, updateUserOnline } = roomsSlice.actions;

export const selectRooms = (state: RootState) => state.rooms;

export const roomsReducer = roomsSlice.reducer;
