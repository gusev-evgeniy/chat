import React, { FC } from 'react';
import Image from 'next/image';

import { useAppDispatch } from '@/store/hooks';
import { openDialog } from '@/store/slices/dialog';
import { CloseIconWrapper, StyledContainer, StyledVeil } from './styles';

import close from 'images/close.svg';

type Props = {
  children: React.ReactElement;
  width?: string;
};

export const DialogWrapper: FC<Props> = ({ children, width }) => {
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    dispatch(openDialog(null));
  };

  return (
    <StyledVeil onClick={closeHandler} datatype='veil'>
      <StyledContainer
        padding={'25px'}
        width={width}
        onClick={e => e.stopPropagation()}>
        <>
          <div className='header'>
            <CloseIconWrapper onClick={closeHandler}>
              <Image width='30px' height='30px' src={close} alt='close' />
            </CloseIconWrapper>
          </div>
          {children}
        </>
      </StyledContainer>
    </StyledVeil>
  );
};
