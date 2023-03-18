import Peer from 'simple-peer';

import { UserBD } from 'types/user';

type GetCall = {
  from: UserBD;
  signal: Peer.SignalData;
  roomId: string;
};

export const callActions = {
  getCall: (payload: GetCall) =>
    ({
      type: 'GET_CALL',
      payload,
    } as const),

  callEnded: () =>
    ({
      type: 'DEFAUL',
    } as const),

  setCompanionStream: (stream: MediaStream) =>
    ({
      type: 'SET_COMPATION_STREAM',
      payload: stream,
    } as const),

  setMyStream: (stream: MediaStream) =>
    ({
      type: 'SET_MY_STREAM',
      payload: stream,
    } as const),

  setCallData: (user: UserBD, roomId: string | null) =>
    ({
      type: 'SET_CALL_DATA',
      payload: { user, roomId },
    } as const),
};
