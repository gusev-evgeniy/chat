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
    setTyping: (state, action: PayloadAction<Typing>) => {
      const { roomId, user, isTyping } = action.payload;
      if (!user) {
        return state;
      }

      const typingInRoom = state.typing[roomId];
      if (!isTyping && typingInRoom) {
        state.typing[roomId] = typingInRoom.filter((typingUser) => typingUser !== user);
      }

      const wasTyping = typingInRoom?.includes(user);

      if (!typingInRoom) state.typing[roomId] = [user];
      else if (!wasTyping) state.typing[roomId].push(user);
    }
  },
});

export const { setMessagesData, addMessage, setTyping } = messagesSlice.actions;

export const selectMessagesData = (state: RootState) => state.messages.data;
export const selectTyping = (state: RootState) => state.messages.typing;

export const messagesReducer = messagesSlice.reducer;
