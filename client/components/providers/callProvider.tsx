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
import { newMessageHandler } from '../../store/actions';
import { useAppDispatch } from '../../store/hooks';
import { openDialog } from '../../store/slices/dialog';
import { Message } from '../../type/messages';
import { UserBD } from '../../type/user';
import { EVENTS } from '../../utils/constants';

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

export const CallProvider: FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();

  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [companionStream, setCompanionStream] = useState<MediaStream | null>(
    null
  );

  const [companionSignal, setCompanionSignal] =
    useState<Peer.SignalData | null>(null);

  const [companion, setCompanion] = useState<null | UserBD>(null);

  const [roomId, setRoomId] = useState<string | null>(null);
  const [isGetCall, setIsGetCall] = useState(false);

  const setStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      // audio: true,
    });
    setMyStream(stream);
    return stream;
  };

  const closeStream = () => {
    myStream?.getTracks().forEach(function (track) {
      track.stop();
    });
    companionStream?.getTracks().forEach(function (track) {
      track.stop();
    });

    setRoomId(null);
    setCompanionStream(null);
    setMyStream(null);
  };

  useInsertionEffect(() => {
    socket.on(EVENTS.CALL.GET, async ({ from, signal, roomId }: GetCall) => {
      dispatch(openDialog('CALL_OFFER'));
      setCompanion(from);
      setCompanionSignal(signal);
      setRoomId(roomId);
      setIsGetCall(true);
    });

    socket.on(EVENTS.CALL.ENDED, (message: Message) => {
      dispatch(newMessageHandler(message));
      closeStream();
      dispatch(openDialog(null));
    });
  }, [myStream, companionStream]);

  useEffect(() => {
    if (!roomId) {
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
        socket.emit(EVENTS.CALL.CALL, {
          signal: data,
          roomId,
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
  }, [roomId]);

  useEffect(() => {
    console.log('companionStream', companionStream);
    if (companionStream && myStream) {
      dispatch(openDialog('CALL'));
    }
  }, [companionStream, myStream]);

  const answerCall = async () => {
    const stream = await setStream();
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', data => {
      socket.emit('answerCall', { signal: data, to: companion?.id });
    });

    peer.on('stream', stream => {
      setCompanionStream(stream);
    });

    peer.signal(companionSignal as Peer.SignalData);
  };

  const leaveCall = () => {
    socket.emit(EVENTS.CALL.END, roomId);
  };

  const setCallData = (user: UserBD, roomId: string | null) => {
    setCompanion(user);
    setRoomId(roomId);
  };

  const value = useMemo(
    () => ({
      myStream,
      leaveCall,
      answerCall,
      setCallData,
      companion,
      companionStream,
      isGetCall,
    }),
    [myStream, companionStream, companion, isGetCall]
  );

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
};

export const useCall = () => useContext(CallContext);
