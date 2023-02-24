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
  const { answerCall, callFrom, callTo } = useCall();
  const { callerVideo, myVideo } = useVideoCall();
  const user = callFrom || callTo;

  if (!user) {
    return null;
  }

  return (
    <StyledVeil>
      <StyledContainer padding={'25px'}>
        <VidoeContainer>
          <Avatar
            name={user.name}
            size={50}
            photo={user.photo}
            online={false}
          />
          <CompanionVideo playsInline ref={callerVideo} autoPlay />
          <MyVideo playsInline muted ref={myVideo} autoPlay />
        </VidoeContainer>

        <CallButtons>
          <CallButton acceptBtn={false}>
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
