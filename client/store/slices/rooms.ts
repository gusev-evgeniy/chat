import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { HYDRATE } from 'next-redux-wrapper';
import { Room, RoomsResponse, SelectedRoom } from '../../type/room';

export interface RoomsState {
  data: Room[];
  selected: SelectedRoom | null;
  count: number;
}

const initialState: RoomsState = {
  data: [] ,
  selected: null,
  count: 0
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
      if (!state.data.includes(action.payload)) {
        state.data.unshift(action.payload);
        state.count = state.count + 1;
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('action', action)
      return {
        ...state,
        ...action.payload.rooms,
      };
    },
  },
});

export const { setRoomsData, selectRoom, addRoom } = roomsSlice.actions;

export const selectRooms = (state: RootState) => state.rooms;

export const roomsReducer = roomsSlice.reducer;
