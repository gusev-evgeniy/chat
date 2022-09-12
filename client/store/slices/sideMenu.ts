import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface SideMenuState {
  isOpen: boolean;
}

const initialState: SideMenuState = {
  isOpen: true
};

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    openSideMenu: (state) => {
      console.log(34324)
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openSideMenu } = sideMenuSlice.actions;

export const sideMenuIsOpen = (state: RootState) => state.sideMenu.isOpen;

export const sideMenuReducer = sideMenuSlice.reducer;
