import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { Message, MessagesResponse, Typing } from '../../type/messages';

export interface MessagesState {
  data: Message[];
  count: number;
  typing: Typing;
}

const initialState: MessagesState = {
  data: [],
  count: 0,
  typing: [],
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
    startTyping: (state, action: PayloadAction<Typing[0]>) => {
      state.typing.push(action.payload);
    },
    stopTyping: (state, action: PayloadAction<Typing[0]>) => {
      state.typing = state.typing.filter(({ user }) => user !== action.payload.user);
    },
  },
});

export const { setMessagesData, addMessage, startTyping, stopTyping } = messagesSlice.actions;

export const selectMessagesData = (state: RootState) => state.messages.data;
export const selectTyping = (state: RootState) => state.messages.typing;

export const messagesReducer = messagesSlice.reducer;
