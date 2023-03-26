import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { userReducer } from './slices/user';
import { roomsReducer } from './slices/rooms';
import { messagesReducer } from './slices/messages';
import { createRoomReducer } from './slices/createRoom';
import { dialogReducer } from './slices/dialog';
import { sideMenuReducer } from './slices/sideMenu';
import { draftReducer } from './slices/draft';
import { errorReducer, setError } from './slices/error';
import { instance } from 'api/index';

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
      errorReducer: errorReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
  });
}

export const store = makeStore();

instance.interceptors.response.use(
  response => response,
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.dispatch(setError(error));

    return Promise.reject(error);
  }
);

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<RootStore>(makeStore);
