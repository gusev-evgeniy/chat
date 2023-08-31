import React from 'react';
import Image from 'next/image';

import { useCall } from '@/providers/call/callProvider';

import { useVideoCall } from './useVideoCall';
import { Avatar } from '@/components/avatar';

import call_end_icon from '@/images/call_end.svg';
import fullscreen from '@/images/fullscreen.svg';

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
  const { callerVideo, myVideo } = useVideoCall();

  if (!companion) {
    return null;
  }

  const { background, name, photo } = companion;

  return (
    <StyledVeil>
      <StyledContainer padding={'25px'}>
        <VidoeContainer>
          <Avatar
            name={name}
            size={50}
            photo={photo}
            online={false}
            gradient={background}
          />
          <CompanionVideo playsInline ref={callerVideo} autoPlay />
          <MyVideo playsInline muted ref={myVideo} autoPlay />
          <div className='veil'>
            <div id='fullscreen_button' className='fullscreen_button'>
              <Image width='30px' height='30px' src={fullscreen} alt='stop' />
            </div>
          </div>
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
