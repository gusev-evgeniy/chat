import React, { FC } from 'react';
import Image from 'next/image';

import { useAppDispatch } from '../../store/hooks';
import { openDialog } from '../../store/slices/dialog';
import { CloseIconWrapper, StyledContainer, StyledVeil } from './styles';

import close from '../../images/close.svg';

type Props = {
  children: React.ReactElement;
};

export const DialogWrapper: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    dispatch(openDialog(null));
  };

  return (
    <StyledVeil onClick={closeHandler} datatype='veil'>
      <StyledContainer padding={'25px'} onClick={e => e.stopPropagation()}>
        <>
          <div className='header'>
            <CloseIconWrapper onClick={closeHandler}>
              <Image width='30px' height='30px' src={close} alt='add_photo' />
            </CloseIconWrapper>
          </div>
          {children}
        </>
      </StyledContainer>
    </StyledVeil>
  );
};
