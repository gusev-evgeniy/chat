import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { UserBD } from 'types/user';

const initialState = {
  users: {
    data: [] as UserBD[],
    count: 0,
  },
  checked: [] as UserBD[],
  title: '',
  type: 'private',
  loaded: false,
  open: false,
};

export type CreateRoomState = typeof initialState;

export const createRoomSlice = createSlice({
  name: 'createRoom',
  initialState,
  reducers: {
    findUsers: (state, action: PayloadAction<{ users: UserBD[]; count: number }>) => {
      const { users, count } = action.payload;

      state.users = { data: users, count };
      state.loaded = true;
    },
    checkUser: (state, action: PayloadAction<{ checked: boolean; id: string }>) => {
      const { checked, id } = action.payload;

      if (checked) {
        const user = state.users.data.find(user => user.id === id);
        if (user) state.checked.push(user);
      } else {
        state.checked = state.checked.filter(user => user.id !== id);
      }

      state.type = state.checked.length > 1 ? 'group' : 'private';
    },
    updateTitle: (state, action: PayloadAction<{ title: string }>) => {
      state.title = action.payload.title;
    },
    createRoomsDefault: (state) => {
      state = initialState;
    },
    openCreateRoom: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    }
  },
});

export const { findUsers, checkUser, updateTitle, createRoomsDefault, openCreateRoom } = createRoomSlice.actions;

export const selectCreatingRoom = (state: RootState) => state.createRoom;
export const selectCreatingRoomOpen = (state: RootState) => state.createRoom.open;

export const createRoomReducer = createRoomSlice.reducer;
