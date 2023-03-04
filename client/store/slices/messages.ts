import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Message, MessagesResponse, RoomsTyping, Typing } from 'types/messages';
import { MessageData } from 'types/room';

const initialState = {
  data: {} as MessageData,
  typing: {} as RoomsTyping,
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

      if (!room) {
        state.data[roomId] = {
          messages: [action.payload],
          count: 1,
          loaded: true,
        };
      } else {
        room.messages = [...room.messages, action.payload];
      }

      // messages.push(action.payload);
      // count++;
    },

    setTyping: (state, action: PayloadAction<Typing>) => {
      const { roomId, user, isTyping } = action.payload;
      if (!user) {
        return state;
      }

      const typingInRoom = state.typing[roomId];
      if (!isTyping && typingInRoom) {
        state.typing[roomId] = typingInRoom.filter(
          typingUser => typingUser !== user
        );
      }

      const wasTyping = typingInRoom?.includes(user);

      if (!typingInRoom) state.typing[roomId] = [user];
      else if (!wasTyping) state.typing[roomId].push(user);
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

export const { setMessagesData, addMessage, setTyping, setAllReadedMessages } =
  messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
