import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Message, MessagesResponse } from 'types/messages';
import { MessagesData } from 'types/room';

const initialState = {
  data: {} as MessagesData,
};
export type MessagesState = typeof initialState;

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessagesData(state, action: PayloadAction<MessagesResponse>) {
      const { count, messages, roomId } = action.payload;
      let room = state.data[roomId];
      if (!room) {
        state.data[roomId] = {
          messages,
          count,
          loaded: true,
        };
      } else {
        room.messages = [...messages, ...room.messages];
      }
    },

    addOffsetMessages(
      state,
      action: PayloadAction<Pick<MessagesResponse, 'messages' | 'roomId'>>
    ) {
      const { messages, roomId } = action.payload;
      let room = state.data[roomId];
      room.messages = [...messages, ...room.messages];
    },

    addNewMessage(state, action: PayloadAction<Message>) {
      const roomId = action.payload.roomId;
      let room = state.data[roomId];
      if (room?.loaded) {
        room.messages.push(action.payload);
        room.count++;
      }
    },

    setAllReadedMessages(state, action: PayloadAction<string>) {
      const room = state.data[action.payload];

      if (room) {
        room.messages = room.messages.map(message => ({
          ...message,
          readed: true,
        }));
      }
    },

    defaultMessages() {
      return initialState;
    },
  },
});

export const {
  setMessagesData,
  addNewMessage,
  setAllReadedMessages,
  addOffsetMessages,
  defaultMessages,
} = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
