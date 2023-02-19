import React, { useEffect, useRef, useState } from 'react';
import { selectCall } from '../../../store/selectors';
import { StyledIconButton } from '../../../styles';
import { StyledContainer, StyledVeil } from '../styles';
import Image from 'next/image';
import call_end_icon from '../../../images/call_end.svg';
import call_icon from '../../../images/call.svg';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Peer, { SignalData } from 'simple-peer';
import { socket } from '../../../api/socket';
import { EVENTS } from '../../../utils/constants';

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

export const Call = () => {
  const { peer, from, callerSignal } = useSelector(selectCall);
  const [ stream, setStream ] = useState<MediaStream | null>(null)

  const myVideo = useRef<HTMLVideoElement>(null);
  const partnerVideo = useRef<HTMLVideoElement>(null);

  const connectionRef= useRef< Peer.Instance | null>(null)

  useEffect(() => {
    if (!peer) {
      return;
    }

    const getMyVideo = (stream: MediaStream) => {
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }
    };

    peer.on('stream', getMyVideo);
  }, [peer]);

	const answerCall =() =>  {
    console.log('111')
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
				if (myVideo.current) myVideo.current.srcObject = stream;
		})

		// setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream as MediaStream
		})
    console.log('peer')
		peer.on("signal", (data) => {
      console.log('to', from)
			socket.emit(EVENTS.CALL.ACCEPT, { signal: data, to: from?.socketId })
		})

		peer.on("stream", (stream) => {
			if (partnerVideo.current) partnerVideo.current.srcObject = stream
		})

		peer.signal(callerSignal as SignalData)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		// setCallEnded(true)
		 if (connectionRef.current) connectionRef.current.destroy()
	}

  return (
    <StyledVeil>
      <StyledContainer padding={'25px'}>
        {/* <Avatar name={name} size={100} photo={photo} online={false} /> */}

        {partnerVideo.current && (
          <Video playsInline ref={partnerVideo} autoPlay />
        )}
        {myVideo.current && <Video playsInline muted ref={myVideo} autoPlay />}

        <div className='buttons'>
          <StyledIconButton>
            <Image
              width='30px'
              height='30px'
              src={call_end_icon}
              alt='end call'
            />
          </StyledIconButton>
          <StyledIconButton onClick={answerCall}>
            <Image width='30px' height='30px' src={call_icon} alt='end call' />
          </StyledIconButton>
        </div>
      </StyledContainer>
    </StyledVeil>
  );
};
