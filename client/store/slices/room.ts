import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Message, RoomResponse } from 'types/messages';
import { RoomData } from 'types/room';

const initialState = {
  data: {} as RoomData,
};
export type RoomState = typeof initialState;

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoomData: (state, action: PayloadAction<RoomResponse>) => {
      const { count, messages: fetchedMessages, roomId, participants } = action.payload;
      let room = state.data[roomId];
      if (!room) {
        state.data[roomId] = {
          messages: fetchedMessages,
          count,
          participants,
          loaded: true,
        };
      } else {
        room.messages = [...fetchedMessages, ...room.messages];
      }
    },

    addOffsetMessages: (state, action: PayloadAction<Pick<RoomResponse, 'messages' | 'roomId'>>) => {
      const { messages, roomId } = action.payload;
      let room = state.data[roomId];
      room.messages = [...messages, ...room.messages];
    },

    addNewMessage: (state, action: PayloadAction<Message>) => {
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
});

export const {
  setRoomData,
  addNewMessage,
  setAllReadedMessages,
  addOffsetMessages
} = roomSlice.actions;

export const roomReducer = roomSlice.reducer;
