import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';

import add_photo from '../../images/add_photo.svg';

import { Auth } from './types';

import { AlertMessage, StyledAdvises, StyledButton, StyledWrapper } from './styles';
import { instance } from '../../api';
import { StyledAva } from '../avatar/styles';
import { AvatarInput } from '../avatar/input';

const VALID_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

export const Name: FC<Auth> = ({ nextPage, changeData, data }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [errorText, setErrorText] = useState('');

  const { name, photo } = data;

  useEffect(() => {
    if (!photo) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(photo);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  const onSelectFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    if (!VALID_TYPES.includes(target.files[0].type)) {
      setErrorText(`
      Invalid file type.
      Please select .jpg, .jpeg or .png file. 
      `);
      changeData({ photo: undefined });
      return;
    }

    setErrorText('');
    changeData({ photo: target.files[0] });
  };

  const onKeyChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    changeData({ name: target.value.trim() });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await instance.post('/user/check_name', { name });
      nextPage();
    } catch (error: any) {
      setErrorText(error.response.data?.message as string);
    }
  };

  return (
    <div>
      <StyledAdvises>
        <p className='bold'>Please enter your name</p>
        <span>and upload your photo</span>
      </StyledAdvises>
      <StyledWrapper padding={'5vh'}>
        <form onSubmit={onSubmit}>
          <div className='user_data'>
            <AvatarInput name={name} onChange={onSelectFile} photo={preview} size={100} />
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
        </form>
      </StyledWrapper>

      {!!errorText && <AlertMessage>{errorText}</AlertMessage>}
    </div>
  );
};
