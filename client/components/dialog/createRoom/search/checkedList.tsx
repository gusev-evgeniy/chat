import React, { FC } from 'react';

import { UserBD } from 'types/user';

import { StyledCheckedItem } from '../styles';
import close from 'images/close.svg';
import Image from 'next/image';

type Props = {
  checked: UserBD[];
  onRemoveUser: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const CheckedList: FC<Props> = ({ checked, onRemoveUser }) => {
  return (
    <div className='checked_list'>
      {checked.map(checkedUser => (
        <StyledCheckedItem
          key={checkedUser.id}
          data-id={checkedUser.id}
          onClick={onRemoveUser}>
          <span className='name'>{checkedUser.name}</span>


          {/* <Image width='20px' height='20px' src={close} alt='close' /> */}
        </StyledCheckedItem>
      ))}
    </div>
  );
};
