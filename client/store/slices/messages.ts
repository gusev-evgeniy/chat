import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { Message, MessagesResponse, RoomsTyping, Typing } from '../../type/messages';

export interface MessagesState {
  data: Message[];
  count: number;
  typing: RoomsTyping;
}

const initialState: MessagesState = {
  data: [],
  count: 0,
  typing: {},
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

    //TODO remake to {roomId: users[]}
    startTyping: (state, action: PayloadAction<Typing>) => {
      const { roomId, user } = action.payload;

      const typingInRoom = state.typing[roomId];
      const wasTyping = typingInRoom?.includes(user);

      if (!typingInRoom) state.typing[roomId] = [user];
      else if (!wasTyping) state.typing[roomId].push(user);
    },
    stopTyping: (state, action: PayloadAction<Typing>) => {
      const { roomId, user } = action.payload;
      console.log('roomId, user', roomId, user)
      if (state.typing[roomId]) {
        state.typing[roomId] = state.typing[roomId].filter((typingUser) => typingUser !== user);
      }
    },
  },
});

export const { setMessagesData, addMessage, startTyping, stopTyping } = messagesSlice.actions;

export const selectMessagesData = (state: RootState) => state.messages.data;
export const selectTyping = (state: RootState) => state.messages.typing;

export const messagesReducer = messagesSlice.reducer;
