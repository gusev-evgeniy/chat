import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { UserBD } from '@/types/user';

const initialState = {
  data: null as UserBD | null,
};
export type UserState = typeof initialState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserBD>) {
      state.data = action.payload;
    },
    defaultUser(state) {
      state.data = null;
    },
  },
  extraReducers: {
    [HYDRATE](state, action) {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { setUserData, defaultUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
