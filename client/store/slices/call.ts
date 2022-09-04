import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserBD } from '../../type/user';

export interface CallState {
  mySignal: null | MediaStream;
  callerSignal: null | MediaStream;
  to: string;
  from: UserBD | null;
  receivingCall: boolean;
  callAccepted: boolean;
}

const initialState: CallState = {
  mySignal: null,
  receivingCall: false,
  from: null,
  callerSignal: null,
  callAccepted: false,
  to: ''
};

export const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    receiveUser: (state, action: PayloadAction<any>) => {
      state.receivingCall = true;
      state.from = action.payload.from;
      state.callerSignal = action.payload.signal;
    },
    callUser: (state, action: PayloadAction<any>) => {
      state.mySignal = action.payload.stream;
      state.to = action.payload.to;
    },
    acceptCall: (state, action: PayloadAction<any>) => {
      state.mySignal = action.payload.signal;
      state.callAccepted = true;
    }
  },
});

export const { receiveUser, callUser, acceptCall } = callSlice.actions;

export const callReducer = callSlice.reducer;
