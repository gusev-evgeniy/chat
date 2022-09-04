import React, { useEffect, useRef } from 'react';
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


export const ReceiveCall = () => {
  const dispatch = useAppDispatch();

  const { from, selected, callerSignal, mySignal } = useAppSelector(GetReceivedCallInfo);

  const userVideo = useRef(null)
  const partnerVideo = useRef(null);

  console.log('callerSignal', callerSignal)
  console.log('mySignal', mySignal)

  const { name, photo, id } = from || ({} as UserBD);

  const endCallHandler = () => {
    socket.emit(EVENTS.CALL.END, { roomId: selected });
  }

  useEffect(() => {
    if (userVideo.current && mySignal) {
      userVideo.current.srcObject = mySignal;
    }
  }, [mySignal])

  // useEffect(() => {
  //   if (partnerVideo.current && callerSignal) {
  //     partnerVideo.current.srcObject = callerSignal;
  //   }
  // }, [callerSignal])

  const acceptCallHandler = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });
      console.log('000000000000000000000', peer)

      peer.on("signal", data => {
        console.log('11111111111111111', data)
        socket.emit(EVENTS.CALL.ACCEPT, { signal: data, to: id, roomId: selected }, () => {
          dispatch(acceptCall({ mySignal: data,  }))
        });
      })
  
      peer.on("stream", stream => {
        if (partnerVideo.current) {
          partnerVideo.current.srcObject = stream;
        }
      });
    });

  }

  return (
    <StyledVeil>
      <StyledContainer padding={25}>
        <Avatar name={name} size={100} photo={photo} online={false} />

        {partnerVideo.current && <Video playsInline ref={partnerVideo} autoPlay />}
        {userVideo.current && <Video playsInline muted ref={userVideo} autoPlay />}

        <div className='buttons'>
          <StyledIconButton onClick={endCallHandler}>
            <Image width='30px' height='30px' src={call_end_icon} alt='end call' /> 
          </StyledIconButton>
          <StyledIconButton onClick={acceptCallHandler}>
            <Image width='30px' height='30px' src={call_icon} alt='end call' />
          </StyledIconButton>
        </div>
      </StyledContainer>
    </StyledVeil>
  );
};
