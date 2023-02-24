import {
  createContext,
  FC,
  useContext,
  useMemo,
  useState,
  useInsertionEffect,
  useEffect,
} from 'react';
import Peer from 'simple-peer';
import { socket } from '../../api/socket';
import { useAppDispatch } from '../../store/hooks';
import { openDialog } from '../../store/slices/dialog';
import { UserBD } from '../../type/user';
import { EVENTS } from '../../utils/constants';

type CallContextType = {
  myStream: MediaStream | undefined;
  companionStream: MediaStream | undefined;
  leaveCall: () => void;
  answerCall: () => void;
  setCallTo: (user: UserBD) => void;
  callFrom: null | UserBD;
  callTo: null | UserBD;
};
type GetCall = {
  from: UserBD;
  signal: Peer.SignalData;
};

export const CallContext = createContext({} as CallContextType);

export const CallProvider: FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();

  const [myStream, setMyStream] = useState<MediaStream>();
  const [companionStream, setCompanionStream] = useState<MediaStream>();

  const [companionSignal, setCompanionSignal] =
    useState<Peer.SignalData | null>(null);

  const [callFrom, setCallFrom] = useState<null | UserBD>(null);
  const [callTo, setCallTo] = useState<null | UserBD>(null);

  useInsertionEffect(() => {
    const getCall = async ({ from, signal }: GetCall) => {
      dispatch(openDialog('CALL_OFFER'));
      setCallFrom(from);
      setCompanionSignal(signal);
    };

    socket.on(EVENTS.CALL.GET, getCall);
  }, []);

  useEffect(() => {
    if (!callTo) {
      return;
    }

    const callUser = async () => {
      dispatch(openDialog('CALL_OFFER'));

      const stream = await setStream();
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on('signal', data => {
        socket.emit('callUser', {
          to: callTo.id,
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
    callUser();
  }, [callTo]);

  useEffect(() => {
    if (companionStream && myStream) {
      dispatch(openDialog('CALL'));
    }
  }, [companionStream, myStream]);

  const setStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      // audio: true,
    });
    setMyStream(stream);
    return stream;
  };

  const answerCall = async () => {
    const stream = await setStream();
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', data => {
      socket.emit('answerCall', { signal: data, to: callFrom?.id });
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
      setCallTo,
      callFrom,
      companionStream,
      callTo,
    }),
    [myStream, companionStream, callFrom, callTo]
  );

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
};

export const useCall = () => useContext(CallContext);
