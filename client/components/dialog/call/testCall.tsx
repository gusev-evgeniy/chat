import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { GetCallInfo, GetReceivedCallInfo } from '../../../store/selectors';
import { StyledIconButton } from '../../../styles';
import { UserBD } from '../../../type/user';
import { Avatar } from '../../avatar';
import { StyledContainer, StyledVeil } from '../styles';
import Image from 'next/image';
import Peer from 'simple-peer';
import call_end_icon from '../../../images/call_end.svg';
import call_icon from '../../../images/call.svg';
import { socket } from '../../../api/socket';
import { EVENTS } from '../../../utils/constants';
import { acceptCall } from '../../../store/slices/call';
import styled from 'styled-components';

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;


export const TestCall = () => {
  const [yourID, setYourID] = useState('');
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState<MediaStream | undefined>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState<Peer.SignalData | undefined>();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    socket.on('hey', ({ signal, from }) => {
      setReceivingCall(true);
      setCaller(from);
      setCallerSignal(signal);
    });
  }, []);

  const callPeer = id => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', data => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: yourID });
    });

    peer.on('stream', stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.on('callAccepted', signal => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  };

  const acceptCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on('signal', data => {
      socket.emit('acceptCall', { signal: data, to: caller });
    });

    peer.on('stream', stream => {
      partnerVideo.current.srcObject = stream;
    });

    if (callerSignal) {
      peer.signal(callerSignal);
    }
  };

  return (
    <StyledVeil>
      <StyledContainer padding={'25px'}>
        {/* <Avatar name={name} size={100} photo={photo} online={false} /> */}

        {partnerVideo.current && <Video playsInline ref={partnerVideo} autoPlay />}
        {userVideo.current && <Video playsInline muted ref={userVideo} autoPlay />}

        <div className='buttons'>
          <StyledIconButton>
            <Image width='30px' height='30px' src={call_end_icon} alt='end call' />
          </StyledIconButton>
          <StyledIconButton onClick={acceptCall}>
            <Image width='30px' height='30px' src={call_icon} alt='end call' />
          </StyledIconButton>
        </div>
      </StyledContainer>
    </StyledVeil>
  );
};
