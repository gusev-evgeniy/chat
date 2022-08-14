import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { UserBD } from '../../type/user';

export interface CreateRoomState {
  users: {
    data: UserBD[];
    count: number;
  };
  checked: UserBD[];
  title: string;
  type: 'private' | 'group';
}

const initialState: CreateRoomState = {
  users: {
    data: [],
    count: 0,
  },
  checked: [],
  title: '',
  type: 'private',
};

export const createRoomSlice = createSlice({
  name: 'createRoom',
  initialState,
  reducers: {
    findUsers: (state, action: PayloadAction<{ users: UserBD[] }>) => {
      state.users.data = action.payload.users;
    },
    checkUser: (state, action: PayloadAction<{ checked: boolean, id: string }>) => {
      
    }
  },
});

export const { findUsers } = createRoomSlice.actions;

export const selectRooms = (state: RootState) => state.createRoom;

export const createRoomReducer = createRoomSlice.reducer;
