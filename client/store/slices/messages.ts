import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { Message, MessagesResponse } from '../../type/messages';

export interface MessagesState {
  data: Message[];
  count: number;
}

const initialState: MessagesState = {
  data: [],
  count: 0,
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessagesData: (state, action: PayloadAction<MessagesResponse>) => {
      state.data = action.payload.messages;
      state.count = action.payload.count;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      if (!state.data.some(({ id }) => id === action.payload.id)) {
        state.data.push(action.payload);
        state.count = state.count + 1;
      }
    },
  },
});

export const { setMessagesData, addMessage } = messagesSlice.actions;

export const selectMessages = (state: RootState) => state.messages;

export const messagesReducer = messagesSlice.reducer;
