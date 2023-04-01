import React, { FC, MouseEventHandler } from 'react';

import { UserBD } from 'types/user';

import { StyledCheckedItem } from '../styles';

type Props = {
  checked: UserBD[];
  onRemoveUser: MouseEventHandler;
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
