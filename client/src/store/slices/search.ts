import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '@/types/messages';
import { Room } from '@/types/room';

const initialState = {
  room: null as Room | null,
  messages: [] as  Message[],
  value: ''
};

export type SearchState = typeof initialState;

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchValue(state, action: PayloadAction<string>) {
      state.value = action.payload.toLowerCase();
    },
    selectSearchRoom(state, action: PayloadAction<Room>) {
      state.room = action.payload;
    },
  },
});

export const { updateSearchValue, selectSearchRoom } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
