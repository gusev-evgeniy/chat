import React from 'react';
import Image from 'next/image';

import { useCall } from 'providers/call/callProvider';

import { useVideoCall } from './useVideoCall';
import { Avatar } from 'components/avatar';

import call_end_icon from 'images/call_end.svg';
import fullscreen from 'images/fullscreen.svg';

import {
  CallButton,
  CallButtons,
  CompanionVideo,
  MyVideo,
  StyledContainer,
  StyledVeil,
  VidoeContainer,
} from '../styles';

export const Call = () => {
  const { leaveCall, companion } = useCall();
  const { callerVideo, myVideo, toggleFullScreen } = useVideoCall();

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
          {/* <div className='fullscreen_button' onClick={toggleFullScreen}>
            <Image width='20px' height='20px' src={fullscreen} alt='stop' />
          </div> */}
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
