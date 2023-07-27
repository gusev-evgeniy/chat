import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserBD } from '@/types/user';
import { generateGradient } from '@/utils/index';

const initialState = {
  users: {
    data: [] as UserBD[],
    count: 0,
  },
  checked: [] as UserBD[],
  title: '',
  type: 'private',
  loaded: false,
  background: generateGradient(),
};

export type CreateRoomState = typeof initialState;

export const createRoomSlice = createSlice({
  name: 'createRoom',
  initialState,
  reducers: {
    findUsers(
      state,
      action: PayloadAction<{ users: UserBD[]; count: number }>
    ) {
      const { users, count } = action.payload;

      state.users = { data: users, count };
      state.loaded = true;
    },
    checkUser(state, action: PayloadAction<{ checked: boolean; id: string }>) {
      const { checked, id } = action.payload;

      if (checked) {
        const user = state.users.data.find(user => user.id === id);
        if (user) state.checked.push(user);
      } else {
        state.checked = state.checked.filter(user => user.id !== id);
      }

      state.type = state.checked.length > 1 ? 'group' : 'private';
    },
    updateTitle(state, action: PayloadAction<{ title: string }>) {
      state.title = action.payload.title;
    },
    createRoomsDefault() {
      return initialState;
    },
  },
});

export const { findUsers, checkUser, updateTitle, createRoomsDefault } =
  createRoomSlice.actions;

export const createRoomReducer = createRoomSlice.reducer;
