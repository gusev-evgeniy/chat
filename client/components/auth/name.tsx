import React, { FC } from 'react';

import { AvatarInput } from 'components/avatar/input';
import { usePreview } from './usePreview';
import { useAuthUserForm } from './useAuthUserForm';

import {
  AlertMessage,
  StyledAdvises,
  StyledButton,
  StyledWrapper,
} from './styles';
import { StyledForm } from 'styles';

import { Auth } from './types';

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
            onChange={onKeyChange}
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
