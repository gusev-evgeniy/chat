import React from 'react';
import {
  CallButton,
  CallButtons,
  CallUser,
  StyledContainer,
  StyledVeil,
} from '../styles';
import Image from 'next/image';
import call_end_icon from '../../../images/call_end.svg';
import call_icon from '../../../images/call.svg';
import { Avatar } from '../../avatar';
import { useCall } from '../../providers/callProvider';

export const CallOffer = () => {
  const { callFrom, callTo, answerCall } = useCall();
  const getCall = !!callFrom;

  const user = getCall ? callFrom : callTo;
  if (!user) {
    return null;
  }

  const { name, photo } = user;
  const headerText = getCall ? `Call from:` : 'Call to:';

  return (
    <StyledVeil>
      <StyledContainer padding={'25px'} width='150px'>
        <CallUser>
          <p className='header'>{headerText}</p>
          <Avatar name={name} size={100} photo={photo} online={false} />
          <p className='name'>{name}</p>
        </CallUser>

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

          {getCall && (
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
