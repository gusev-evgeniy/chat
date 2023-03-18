import React from 'react';
import Image from 'next/image';

import { Avatar } from 'components/avatar';

import { useCall } from 'providers/call/callProvider';

import call_end_icon from 'images/call_end.svg';
import call_icon from 'images/call.svg';

import {
  CallButton,
  CallButtons,
  CallUser,
  StyledContainer,
  StyledVeil,
} from '../styles';

export const CallOffer = () => {
  const { companion, isGetCall, answerCall, leaveCall } = useCall();
  if (!companion) {
    return null;
  }

  const { name, photo } = companion;
  const headerText = isGetCall ? `Call from:` : 'Call to:';

  return (
    <StyledVeil>
      <StyledContainer padding={'25px'} width='150px'>
        <CallUser>
          <p className='header'>{headerText}</p>
          <Avatar name={name} size={100} photo={photo} online={false} />
          <p className='name'>{name}</p>
        </CallUser>

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

          {isGetCall && (
            <CallButton onClick={answerCall} acceptBtn>
              <Image
                width='30px'
                height='30px'
                src={call_icon}
                alt='end call'
                title='accept call'
              />
            </CallButton>
          )}
        </CallButtons>
      </StyledContainer>
    </StyledVeil>
  );
};
