import Portal from '@/components/portal';
import React from 'react';
import Image from 'next/image';

import { closeError } from '@/store/slices/error';
import { selectError } from '@/store/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import close_icon from '@/images/close_bold_white.svg';

import { StyledErrorWrapper } from './styles';

export const Error = () => {
  const dispatch = useAppDispatch();

  const errorMessage = useAppSelector(selectError);
  if (!errorMessage) {
    return null;
  }

  const close = () => dispatch(closeError());

  return (
    <Portal type='error'>
      <StyledErrorWrapper>
        {' '}
        {errorMessage}{' '}
        <button className='closeButton' onClick={close}>
          <Image width='20px' height='20px' src={close_icon} alt='close' />
        </button>{' '}
      </StyledErrorWrapper>
    </Portal>
  );
};
