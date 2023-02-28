import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: true,
};
export type SideMenuState = typeof initialState;

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    openSideMenu: state => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openSideMenu } = sideMenuSlice.actions;

export const sideMenuReducer = sideMenuSlice.reducer;
