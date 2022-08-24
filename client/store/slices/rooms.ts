import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { HYDRATE } from 'next-redux-wrapper';
import { Room, RoomsResponse } from '../../type/room';
import { Message } from '../../type/messages';
import { UserBD } from '../../type/user';


export type SelectedRoom = Omit<Partial<Room>, 'id'> & { id: string | null; participants: UserBD[] };
export interface RoomsState {
  data: Room[];
  selected: string | null;
  count: number;
}

const initialState: RoomsState = {
  data: [],
  selected: null,
  count: 0,
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRoomsData: (state, action: PayloadAction<RoomsResponse>) => {
      state.data = action.payload.rooms;
      state.count = action.payload.count;
    },
    selectRoom: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      if (!state.data.some(({ id }) => id === action.payload.id)) {
        state.data.unshift(action.payload);
        state.count = state.count + 1;
      }
    },
    updateLastMessage: (state, action: PayloadAction<Message>) => {
      const { author, ...lastMessage } = action.payload;

      state.data = state.data.reduce((acc, curr) => {
        if (curr.id === action.payload.roomId) acc.unshift({ ...curr, lastMessage });
        else acc.push(curr);

        return acc;
      }, [] as Room[]);
    },
    updateUserOnline: (
      state,
      action: PayloadAction<{ userId: string; online: boolean; wasOnline?: string }>
    ) => {
      const { userId, online, wasOnline } = action.payload;

      state.data = state.data.map(room => {
        const participants = room.participants.map(user =>
          user.id === userId
            ? {
                ...user,
                online,
                wasOnline: wasOnline ? wasOnline : user.wasOnline,
              }
            : user
        );

        return {
          ...room,
          participants,
        };
      });
    },
    setUnreadedCount(state, action: PayloadAction<{ roomId: string, count: number }>) {
      const { roomId, count } = action.payload;

      state.data = state.data.map(room =>
        room.id === roomId ? { ...room, unreadedMessagesCount: count } : room
      );
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.rooms,
      };
    },
  },
});

export const {
  setRoomsData,
  selectRoom,
  addRoom,
  updateLastMessage,
  updateUserOnline,
  setUnreadedCount,
} = roomsSlice.actions;

export const selectRooms = (state: RootState) => state.rooms;

export const roomsReducer = roomsSlice.reducer;
