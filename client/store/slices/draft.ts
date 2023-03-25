import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Action = {
  key: string;
  text: string;
};

type Data = {
  [key: string]: string;
};

const initialState = {
  data: {} as Data,
};

export type DraftState = typeof initialState;

export const draftSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {
    changeDraft: (state, action: PayloadAction<Action>) => {
      const { key, text } = action.payload;
      state.data[key] = text;
    },
  },
});

export const { changeDraft } = draftSlice.actions;

export const draftReducer = draftSlice.reducer;
