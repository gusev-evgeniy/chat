// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../index';
// import { HYDRATE } from 'next-redux-wrapper';

// export interface DialogsState {
//   data: any | null;
// }

// const initialState: DialogsState = {
//   data: null,
// };

// export const dialogsSlice = createSlice({
//   name: 'dialogs',
//   initialState,
//   reducers: {
//     setDialogsData: (state, action: PayloadAction<any>) => {
//       state.data = action.payload;
//     },
//   },
//   extraReducers: {
//     [HYDRATE]: (state, action) => {
//       return {
//         ...state,
//         ...action.payload.dialogs,
//       };
//     },
//   },
// });

// export const { setDialogsData } = dialogsSlice.actions;

// export const selectUserData = (state: RootState) => state.dialogs.data;

// export const dialogsReducer = dialogsSlice.reducer;
