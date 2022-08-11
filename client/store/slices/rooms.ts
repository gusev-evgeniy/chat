import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { HYDRATE } from 'next-redux-wrapper';
import { Room, RoomsResponse, SelectedRoom } from '../../type/room';
import { UserBD } from '../../type/user';

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
    setSelectedRoom: (state, action: PayloadAction<SelectedRoom>) => {
      state.selected = action.payload;
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

export const { setRoomsData, setSelectedRoom } = roomsSlice.actions;

export const selectRooms = (state: RootState) => state.rooms;

export const roomsReducer = roomsSlice.reducer;
