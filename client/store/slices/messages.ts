import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Message, MessagesResponse } from 'types/messages';
import { MessageData } from 'types/room';

const initialState = {
  data: {} as MessageData,
};
export type MessagesState = typeof initialState;

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessagesData: (state, action: PayloadAction<MessagesResponse>) => {
      const { count, messages: fetchedMessages, roomId } = action.payload;
      let room = state.data[roomId];
      if (!room) {
        state.data[roomId] = {
          messages: fetchedMessages,
          count,
          loaded: true,
        };
      } else {
        room.messages = [...fetchedMessages, ...room.messages];
      }
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const roomId = action.payload.roomId;
      let room = state.data[roomId];
      if (room?.loaded) {
        room.messages.push(action.payload);
        room.count++;
      }
    },

    setAllReadedMessages: (state, action: PayloadAction<string>) => {
      const room = state.data[action.payload];

      if (room) {
        room.messages = room.messages.map(message => ({
          ...message,
          readed: true,
        }));
      }
    },

  },
  // extraReducers: builder => {
  //   builder.addCase(
  //     setRoomsData,
  //     (state, action: PayloadAction<{ data: RoomsResponse; myId: string }>) => {
  //       state.data = action.payload.data.rooms.reduce((acc, { id }) => {
  //         acc[id] = { messages: [], count: 0, loaded: false };

  //         return acc;
  //       }, {} as MessageData);
  //     }
  //   );
  // },
});

export const {
  setMessagesData,
  addMessage,
  setAllReadedMessages,
} = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
