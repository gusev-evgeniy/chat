import Image from 'next/image';
import React, { FC } from 'react';

import add_photo from '../../images/add_photo.svg';

import { Auth } from './types';

import {
  AlertMessage,
  StyledAdvises,
  StyledButton,
  StyledFormAuth,
  StyledWrapper,
} from './styles';
import { StyledAva } from '../avatar/styles';
import { AvatarInput } from '../avatar/input';
import { usePreview } from './usePreview';
import { useAuthForm } from './useAuthForm';

export const Name: FC<Auth> = (props) => {
  const { name, photo } = props.data;

  const { preview } = usePreview(photo);
  const { onKeyChange, onSelectFile, onSubmit, errorText } = useAuthForm(props)

  return (
    <div>
      <StyledAdvises>
        <p className='bold'>Please enter your name</p>
        <span>and upload your photo</span>
      </StyledAdvises>
      <StyledWrapper padding={'5vh'}>
        <StyledFormAuth onSubmit={onSubmit}>
          <div className='user_data'>
            <AvatarInput
              name={name}
              onChange={onSelectFile}
              photo={preview}
              size={100}
            />
          </div>
          <input
            type='text'
            className='text-input'
            placeholder='Your name'
            onChange={e => onKeyChange(e)}
            autoFocus
          />
          <StyledButton width='160px' height='48px' disabled={!name.length}>
            Next
            <span className='arrow'>&rarr;</span>
          </StyledButton>
        </StyledFormAuth>
      </StyledWrapper>

      {!!errorText && <AlertMessage>{errorText}</AlertMessage>}
    </div>
  );
};
