import React, { FC } from 'react';

import { Auth } from './types';

import {
  AlertMessage,
  StyledAdvises,
  StyledButton,
  StyledWrapper,
} from './styles';
import { AvatarInput } from '../avatar/input';
import { usePreview } from './usePreview';
import { useAuthUserForm } from './useAuthUserForm';
import { StyledForm } from '../../styles';

export const Name: FC<Auth> = props => {
  const { data, changeData } = props
  const { name, photo } = data;

  const { preview } = usePreview(photo);
  const { onSelectFile, onSubmit, errorText } = useAuthUserForm(props);

  const onKeyChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    changeData({ name: target.value.trim() });
  };

  return (
    <div>
      <StyledAdvises>
        <p className='bold'>Please enter your name</p>
        <span>and upload your photo</span>
      </StyledAdvises>
      <StyledWrapper padding={'5vh'}>
        <StyledForm onSubmit={onSubmit}>
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
        </StyledForm>
      </StyledWrapper>

      {!!errorText && <AlertMessage>{errorText}</AlertMessage>}
    </div>
  );
};
