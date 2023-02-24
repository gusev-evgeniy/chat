import {
  createContext,
  FC,
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
  RefObject,
  useInsertionEffect,
} from 'react';
import Peer from 'simple-peer';
import { socket } from '../../api/socket';
import { UserBD } from '../../type/user';
import { EVENTS } from '../../utils/constants';

type CallContextType = {
  receivingCall: boolean;
  myStream: MediaStream | undefined;
  callerStream: MediaStream | undefined;
  leaveCall: () => void;
  answerCall: () => void;
  callUser: (socketId: string) => void;
  callAccepted: boolean;
  callEnded: boolean;
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
  const [callerStream, setCallerStream] = useState<MediaStream>();

  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState<Peer.SignalData | null>(
    null
  );
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [caller, setCaller] = useState<null | UserBD>(null);

  const connectionRef = useRef<Peer.Instance>();
  // const answerPeerRef = useRef<Peer.Instance>();

  const setStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    console.log('1111')
    setMyStream(stream);
    return stream;
  };

  useInsertionEffect(() => {
    setStream();
    const getCall = async ({ from, signal }: GetCall) => {
      setReceivingCall(true);
      setCaller(from);
      setCallerSignal(signal);
    };

    socket.on(EVENTS.CALL.GET, getCall);
  }, []);

  const callUser = async (id: string) => {
    await setStream();
    console.log('CALL USER')
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: myStream,
    });
    // answerPeerRef.current = peer;
    peer.on('signal', data => {
      socket.emit('callUser', {
        to: id,
        signal: data,
      });
    });

    peer.on('stream', stream => {
      setCallerStream(stream);
    });
    socket.on(EVENTS.CALL.ACCEPTED, signal => {
      console.log('ACCEPTED', signal)
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = async () => {
    console.log('ANSWER CALL')
    setCallAccepted(true);
    const stream = await setStream();
    console.log('myStream', myStream)
    console.log('tersfs', stream)
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    console.log('peer', peer)

    peer.on('signal', data => {
      socket.emit('answerCall', { signal: data, to: caller?.id });
    });
    peer.on('stream', stream => {
      console.log('stream', stream)
      setCallerStream(stream);
    });
    console.log('callerSignal111', callerSignal)
    peer.signal(callerSignal as Peer.SignalData);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
  };

  const value = useMemo(
    () => ({
      receivingCall,
      myStream,
      leaveCall,
      answerCall,
      callUser,
      callAccepted,
      callEnded,
      caller,
      callerStream,
    }),
    [receivingCall, myStream, callEnded, callAccepted, caller, callerStream]
  );

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
};

export const useCall = () => useContext(CallContext);
