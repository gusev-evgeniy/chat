import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';

import { Auth } from './types';

import add_photo from '../../images/add_photo.svg';
import { StyledAdvises, StyledAva, StyledButton, StyledWrapper } from './styles';

export const Name: FC<Auth> = ({ nextPage, changeData, data }) => {
  const [preview, setPreview] = useState<string | undefined>();
  const { name, photo } = data;

  useEffect(() => {
    if (!photo) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(photo);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  const onSelectFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      changeData({ photo: undefined });
      return;
    }

    changeData({ photo: target.files[0] });
  };

  const onKeyChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    changeData({ name: target.value.trim() })
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextPage()
  }

  return (
    <>
      <StyledAdvises>
        <p>What&rsquo;s your full name?</p>
        <span>People use real names on TalkClub Thnx!</span>
      </StyledAdvises>
      <StyledWrapper padding={55}>
        <form onSubmit={onSubmit}>
        <div className='user_data'>
          <StyledAva title='Add photo' backgroundImage={preview}>
            <label className='upload' htmlFor='inputTag'>
              <Image width='30px' height='30px' src={add_photo} alt='add_photo' />
              <input id='inputTag' type='file' onChange={onSelectFile} hidden />
            </label>
            <span>{!preview && name.substring(0, 2).toUpperCase()}</span>
          </StyledAva>
        </div>
        <input type='text' className='text-input' placeholder='Your name' onChange={e => onKeyChange(e)} />
        <StyledButton width='160px' height='48px' disabled={!name.length}>
          Next
          <span className='arrow'>&rarr;</span>
        </StyledButton>
        </form>
      </StyledWrapper>
    </>
  );
};
