import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RoomsTyping, Typing } from 'types/messages';

const initialState = {
  typing: {} as RoomsTyping,
};
export type TypingState = typeof initialState;

export const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    setTyping: (state, action: PayloadAction<Typing>) => {
      const { roomId, user, isTyping } = action.payload;
      if (!user) {
        return state;
      }

      const typingInRoom = state.typing[roomId];
      if (isTyping === false && typingInRoom) {
        state.typing[roomId] = typingInRoom.filter(
          typingUser => typingUser !== user
        );
      }

      const wasTyping = typingInRoom?.includes(user);

      if (!typingInRoom) state.typing[roomId] = [user];
      else if (!wasTyping) state.typing[roomId].push(user);
    },
  }
});

export const { setTyping } =
  typingSlice.actions;

export const typingReducer = typingSlice.reducer;
