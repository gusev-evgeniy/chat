import React from 'react';
import {
  CallButton,
  CallButtons,
  CompanionVideo,
  MyVideo,
  StyledContainer,
  StyledVeil,
  VidoeContainer,
} from '../styles';
import Image from 'next/image';
import call_end_icon from '../../../images/call_end.svg';
import { useCall } from '../../providers/callProvider';
import { useVideoCall } from './useVideoCall';
import { Avatar } from '../../avatar';

export const Call = () => {
  const { leaveCall, companion } = useCall();
  const { callerVideo, myVideo } = useVideoCall();

  if (!companion) {
    return null;
  }

  return (
    <StyledVeil>
      <StyledContainer padding={'25px'}>
        <VidoeContainer>
          <Avatar
            name={companion.name}
            size={50}
            photo={companion.photo}
            online={false}
          />
          <CompanionVideo playsInline ref={callerVideo} autoPlay />
          <MyVideo playsInline muted ref={myVideo} autoPlay />
        </VidoeContainer>

        <CallButtons>
          <CallButton acceptBtn={false} onClick={leaveCall}>
            <Image
              width='30px'
              height='30px'
              src={call_end_icon}
              alt='end call'
              title='end call'
            />
          </CallButton>
        </CallButtons>
      </StyledContainer>
    </StyledVeil>
  );
};