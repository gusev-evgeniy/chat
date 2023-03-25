import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { userReducer } from './slices/user';
import { roomsReducer } from './slices/rooms';
import { messagesReducer } from './slices/messages';
import { createRoomReducer } from './slices/createRoom';
import { dialogReducer } from './slices/dialog';
import { sideMenuReducer } from './slices/sideMenu';
import { draftReducer } from './slices/draft';

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      rooms: roomsReducer,
      messages: messagesReducer,
      createRoom: createRoomReducer,
      dialog: dialogReducer,
      sideMenu: sideMenuReducer,
      draft: draftReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const wrapper = createWrapper<RootStore>(makeStore);
