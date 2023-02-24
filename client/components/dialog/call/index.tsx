import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { GetCallInfo } from '../../../store/selectors';
import { StyledIconButton } from '../../../styles';
import { UserBD } from '../../../type/user';
import { Avatar } from '../../avatar';
import { StyledContainer, StyledVeil } from '../styles';
import Image from 'next/image';

import call_end_icon from '../../../images/call_end.svg';
import { socket } from '../../../api/socket';
import { EVENTS } from '../../../utils/constants';
import styled from 'styled-components';

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

export const Call = () => {
  const { mySignal, to, selected, companionSignal } = useAppSelector(GetCallInfo);
  const { name, photo } = to || ({} as UserBD);

  const userVideo = useRef(null)
  const partnerVideo = useRef(null);

  console.log('companionSignal', companionSignal)
  console.log('mySignal', mySignal)

  useEffect(() => {
    if (userVideo.current && mySignal) {
      console.log('mySignal', mySignal)
      userVideo.current.srcObject = mySignal;
    }
  }, [mySignal])

  useEffect(() => {
    if (partnerVideo.current && companionSignal) {
      partnerVideo.current.srcObject = companionSignal;
    }
  }, [companionSignal])

  const endCallHandler = () => {
    socket.emit(EVENTS.CALL.END, { roomId: selected });
  }

  return (
    <StyledVeil>
      <StyledContainer padding={'25px'}>
        <Avatar name={name || ''} size={100} photo={photo} online={false} />

        {partnerVideo && <Video playsInline ref={partnerVideo} autoPlay />}
        {userVideo && <Video playsInline muted ref={userVideo} autoPlay />}

        <div className='end_call'>
          <StyledIconButton onClick={endCallHandler}>
            <Image width='30px' height='30px' src={call_end_icon} alt='end call' />
          </StyledIconButton>
        </div>
      </StyledContainer>
    </StyledVeil>
  );
};
