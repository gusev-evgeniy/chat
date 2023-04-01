import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  errorMessage: '',
};

export type ErrorState = typeof initialState;

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },

    closeError() {
      return initialState;
    },
  },
});

export const { setError, closeError } = errorSlice.actions;

export const errorReducer = errorSlice.reducer;
