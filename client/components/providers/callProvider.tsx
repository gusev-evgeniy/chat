import {
  createContext,
  FC,
  useContext,
  useMemo,
  useState,
  useInsertionEffect,
} from 'react';
import Peer from 'simple-peer';
import { socket } from '../../api/socket';
import { UserBD } from '../../type/user';
import { EVENTS } from '../../utils/constants';

type CallContextType = {
  myStream: MediaStream | undefined;
  companionStream: MediaStream | undefined;
  leaveCall: () => void;
  answerCall: () => void;
  callUser: (socketId: string) => void;
  caller: null | UserBD;
};
type GetCall = {
  from: UserBD;
  signal: Peer.SignalData;
};

export const CallContext = createContext({} as CallContextType);

export const CallProvider: FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [myStream, setMyStream] = useState<MediaStream>();
  const [companionStream, setCompanionStream] = useState<MediaStream>();

  const [companionSignal, setCompanionSignal] =
    useState<Peer.SignalData | null>(null);
  const [caller, setCaller] = useState<null | UserBD>(null);

  const setStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setMyStream(stream);
    return stream;
  };

  useInsertionEffect(() => {
    const getCall = async ({ from, signal }: GetCall) => {
      setCaller(from);
      setCompanionSignal(signal);
    };

    socket.on(EVENTS.CALL.GET, getCall);
  }, []);

  const callUser = async (id: string) => {
    const stream = await setStream();
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', data => {
      socket.emit('callUser', {
        to: id,
        signal: data,
      });
    });

    peer.on('stream', stream => {
      setCompanionStream(stream);
    });

    socket.on(EVENTS.CALL.ACCEPTED, signal => {
      peer.signal(signal);
    });
  };

  const answerCall = async () => {
    const stream = await setStream();
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', data => {
      socket.emit('answerCall', { signal: data, to: caller?.id });
    });

    peer.on('stream', stream => {
      setCompanionStream(stream);
    });

    peer.signal(companionSignal as Peer.SignalData);
  };

  const leaveCall = () => {};

  const value = useMemo(
    () => ({
      myStream,
      leaveCall,
      answerCall,
      callUser,
      caller,
      companionStream,
    }),
    [myStream, caller, companionStream]
  );

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
};

export const useCall = () => useContext(CallContext);
