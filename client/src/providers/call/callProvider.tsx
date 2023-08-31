import { createContext, FC, useContext, useEffect, useReducer } from 'react';
import Peer from 'simple-peer';

import { socket } from '@/api/socket';

import { newMessageHandler } from '@/store/actions';
import { useAppDispatch } from '@/store/hooks';
import { openDialog } from '@/store/slices/dialog';
import { EVENTS } from '@/utils/constants';

import { callReducer, initCallState } from './reducers';
import { callActions as actions } from './actions';

import { Message } from '@/types/messages';
import { UserBD } from '@/types/user';

type CallContextType = {
  myStream: MediaStream | null;
  companionStream: MediaStream | null;
  leaveCall: () => void;
  answerCall: () => void;
  setCallData: (user: UserBD, roomId: string | null) => void;
  companion: null | UserBD;
  isGetCall: boolean;
};
type GetCall = {
  from: UserBD;
  signal: Peer.SignalData;
  roomId: string;
};

export const CallContext = createContext({} as CallContextType);

export const CallProvider: FC<{ children: React.ReactElement }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [state, callDispatch] = useReducer(callReducer, initCallState);
  const { companion, companionSignal, companionStream, isGetCall, myStream, roomId } = state;

  const setStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      // audio: true,
    });
    callDispatch(actions.setMyStream(stream));
    return stream;
  };

  useEffect(() => {
    socket.on(EVENTS.CALL.GET, async (data: GetCall) => {
      dispatch(openDialog('CALL_OFFER'));
      callDispatch(actions.getCall(data));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on(EVENTS.CALL.ENDED, (message: Message) => {
      dispatch(newMessageHandler(message));
      dispatch(openDialog(null));
      callDispatch(actions.callEnded());
    });

    return () => {
      socket.off(EVENTS.CALL.ENDED);
    };
  }, [myStream, dispatch]);

  useEffect(() => {
    if (companionStream && myStream) {
      dispatch(openDialog('CALL'));
    }
  }, [companionStream, myStream, dispatch]);

  const answerCall = async () => {
    const stream = await setStream();
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', data => {
      socket.emit('answerCall', { signal: data, to: state.companion?.id });
    });

    peer.on('stream', stream => {
      callDispatch(actions.setCompanionStream(stream));
    });

    peer.signal(companionSignal as Peer.SignalData);
  };

  const leaveCall = () => {
    socket.emit(EVENTS.CALL.END, roomId);
    dispatch(openDialog(null));
  };

  const callUser = async (roomId: string) => {
    dispatch(openDialog('CALL_OFFER'));

    const stream = await setStream();
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', data => {
      socket.emit(EVENTS.CALL.CALL, {
        signal: data,
        roomId,
      });
    });

    peer.on('stream', stream => {
      callDispatch(actions.setCompanionStream(stream));
    });

    socket.on(EVENTS.CALL.ACCEPTED, signal => {
      peer.signal(signal);
    });
  };

  const setCallData = (user: UserBD, roomId: string | null) => {
    callDispatch(actions.setCallData(user, roomId));
    callUser(roomId as string);
  };

  const value = {
    myStream,
    leaveCall,
    answerCall,
    setCallData,
    companion,
    companionStream,
    isGetCall,
  };

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
};

export const useCall = () => useContext(CallContext);
