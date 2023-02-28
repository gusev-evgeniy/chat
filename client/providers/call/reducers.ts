import Peer from 'simple-peer';
import { InferActionsTypes } from 'types/actions';
import { UserBD } from 'types/user';
import { callActions } from './actions';

export const initCallState = {
  myStream: null as MediaStream | null,
  companionStream: null as MediaStream | null,
  companionSignal: null as Peer.SignalData | null,
  companion: null as UserBD | null,
  roomId: '',
  isGetCall: false,
  closeStream: false,
};

type CallState = typeof initCallState;

type ActionsType = InferActionsTypes<typeof callActions>;

export const callReducer = (
  state = initCallState,
  action: ActionsType
): CallState => {
  switch (action.type) {
    case 'GET_CALL': {
      const { from, roomId, signal } = action.payload;
      return {
        ...state,
        companion: from,
        roomId,
        companionSignal: signal,
        isGetCall: true,
      };
    }

    case 'SET_CALL_DATA': {
      const { roomId, user } = action.payload;
      return { ...state, companion: user, roomId: roomId as string };
    }

    case 'SET_COMPATION_STREAM': {
      return { ...state, companionStream: action.payload };
    }

    case 'SET_MY_STREAM': {
      return { ...state, myStream: action.payload };
    }

    case 'DEFAUL': {
      return initCallState;
    }

    default:
      return state;
  }
};
