import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { HYDRATE } from 'next-redux-wrapper';
import { Room, RoomsResponse, SelectedRoom } from '../../type/room';
import { Message } from '../../type/messages';

export interface RoomsState {
  data: Room[];
  selected: SelectedRoom | null;
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
    selectRoom: (state, action: PayloadAction<SelectedRoom>) => {
      state.selected = action.payload;
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
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('action', action);
      return {
        ...state,
        ...action.payload.rooms,
      };
    },
  },
});

export const { setRoomsData, selectRoom, addRoom, updateLastMessage } = roomsSlice.actions;

export const selectRooms = (state: RootState) => state.rooms;

export const roomsReducer = roomsSlice.reducer;
