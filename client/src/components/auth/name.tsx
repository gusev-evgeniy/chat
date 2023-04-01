import React, { ChangeEvent, FC } from 'react';

import { AvatarInput } from 'components/avatar/input';
import { useAvatartPreview } from 'hooks/useAvatartPreview';
import { useAuthUserForm } from './useAuthUserForm';

import {
  AlertMessage,
  AuthInput,
  BackButon,
  StyledAdvises,
  StyledButton,
  StyledWrapper,
} from './styles';
import { StyledForm } from 'styles';

import arrow_back from 'images/arrow_back.svg';

import { AuthName } from './types';
import Image from 'next/image';

export const Name: FC<AuthName> = props => {
  const { data, changeData, changePage } = props;
  const { name, photo, background } = data;

  const { preview } = useAvatartPreview(photo);
  const { onSelectFile, onSubmit, errorText } = useAuthUserForm(props);

  const onKeyChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    changeData({ name: target.value.trim() });
  };

  return (
    <div>
      <StyledAdvises>
        <p className='bold'>Please enter your name</p>
        <span>and upload your photo</span>
      </StyledAdvises>
      <StyledWrapper padding={'5vh'}>
        <BackButon onClick={() => changePage(-1)}>
          <Image width='30px' height='30px' src={arrow_back} alt='back' />
        </BackButon>

        <StyledForm onSubmit={onSubmit}>
          <div className='user_data'>
            <AvatarInput
              name={name}
              onChange={onSelectFile}
              photo={preview}
              size={100}
              gradient={background}
            />
          </div>
          <AuthInput
            type='text'
            placeholder='Your name'
            onChange={onKeyChange}
            autoFocus
            margin='0 0 32px 0'
          />

          <StyledButton width='160px' height='43px' disabled={!name.length}>
            Next
            <span className='arrow'>&rarr;</span>
          </StyledButton>
        </StyledForm>
      </StyledWrapper>

      {!!errorText && <AlertMessage>{errorText}</AlertMessage>}
    </div>
  );
};
