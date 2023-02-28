import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

type DialogType =
  | 'GROUP_INFO'
  | 'CALL'
  | 'CREATE_ROOM'
  | 'CALL_OFFER';

const initialState = {
  name: null as DialogType | null, 
};

export type DialogState = typeof initialState;

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<DialogState['name']>) => {
      state.name = action.payload;
    },
  },
});

export const { openDialog } = dialogSlice.actions;

export const selectDialog = (state: RootState) => state.dialog.name;

export const dialogReducer = dialogSlice.reducer;
