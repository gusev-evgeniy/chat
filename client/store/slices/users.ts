import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserBD } from 'types/user';
import { UsersData } from 'types/users';

const initialState = {
  data: {} as UsersData,
};
export type UsersState = typeof initialState;

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserBD[]>) => {
      action.payload.forEach(user => {
        state.data[user.id] = user;
      });
    },

    updateUserOnline: (
      state,
      action: PayloadAction<{
        userId: string;
        online: boolean;
        wasOnline?: string;
      }>
    ) => {
      const { online, userId, wasOnline } = action.payload;

      state.data[userId] = {
        ...state.data[userId],
        online,
        wasOnline: wasOnline ? wasOnline : state.data[userId].wasOnline,
      };
    },
  },
});

export const { setUsers, updateUserOnline } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
