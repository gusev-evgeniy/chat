import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserBD } from '../../type/user';
import Peer, { SignalData } from 'simple-peer';

const initialState = {
  mySignal: null as MediaStream | null,
  receivingCall: false,
  from: null as UserBD | null,
  companionSignal: null as SignalData | null,
  callAccepted: false,
  to: null as UserBD | null,
  peer: null as Peer.Instance | null
};

export type CallState = typeof initialState;

export const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    receiveCall: (state, action: PayloadAction<any>) => {
      state.receivingCall = true;
      state.from = action.payload.from;
      state.companionSignal = action.payload.signal;
    },
    callUser: (state, action: PayloadAction<any>) => {
      state.mySignal = action.payload.stream;
      state.to = action.payload.participant;
      state.peer = action.payload.peer;
    },
    getAnswerSignal: (state, action: PayloadAction<any>) => {
      state.mySignal = action.payload.signal;
      state.callAccepted = true;
    }
  },
});

export const { receiveCall, callUser, getAnswerSignal } = callSlice.actions;

export const callReducer = callSlice.reducer;
