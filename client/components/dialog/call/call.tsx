import React from 'react';
import { selectCall } from '../../../store/selectors';
import { StyledIconButton } from '../../../styles';
import { StyledContainer, StyledVeil } from '../styles';
import Image from 'next/image';
import call_end_icon from '../../../images/call_end.svg';
import call_icon from '../../../images/call.svg';
import styled from 'styled-components';
import { Avatar } from '../../avatar';
import { useCall } from '../../providers/callProvider';
import { useVideoCall } from './useVideoCall';

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

export const Call = () => {
  const { caller, answerCall } = useCall();

  const { callerVideo, myVideo } = useVideoCall()

  return (
    <StyledVeil>
      <StyledContainer padding={'25px'}>
        {caller && (
          <Avatar
            name={caller.name}
            size={100}
            photo={caller.photo}
            online={false}
          />
        )}

        <Video playsInline ref={callerVideo} autoPlay />
        <Video playsInline muted ref={myVideo} autoPlay />

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
