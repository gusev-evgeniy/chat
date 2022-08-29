import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

import { useAppDispatch } from '../../store/hooks';
import { openDialog } from '../../store/slices/dialog';

import { StyledVeil } from './styles';
import { CloseIconWrapper, StyledContainer } from './styles';

import close from '../../images/close.svg';

type Props = {
  children: React.ReactElement;
};

const Portal: FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  const closeHandler = () => {
    dispatch(openDialog(null));
  };

  return createPortal(
    <StyledVeil onClick={closeHandler} datatype='veil'>
      <StyledContainer padding={25} onClick={e => e.stopPropagation()}>
        <>
          <div className='header'>
            <CloseIconWrapper onClick={closeHandler}>
              <Image width='30px' height='30px' src={close} alt='add_photo' />
            </CloseIconWrapper>
          </div>
          {children}
        </>
      </StyledContainer>
    </StyledVeil>,
    document.getElementById('myportal') as HTMLElement
  );
};

export default Portal;
