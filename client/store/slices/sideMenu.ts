import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

const initialState = {
  isOpen: true
};
export type SideMenuState = typeof initialState;

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    openSideMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openSideMenu } = sideMenuSlice.actions;

export const sideMenuIsOpen = (state: RootState) => state.sideMenu.isOpen;

export const sideMenuReducer = sideMenuSlice.reducer;
