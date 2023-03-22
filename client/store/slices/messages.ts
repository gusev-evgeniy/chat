import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Message, MessagesResponse, RoomsTyping, Typing } from 'types/messages';
import { MessageData, RoomsResponse } from 'types/room';
import { setRoomsData } from './rooms';

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
      if (room?.loaded) {
        room.messages.push(action.payload);
        room.count++;
      }
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

export const { setMessagesData, addMessage, setTyping, setAllReadedMessages } =
  messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
