import React, { FC } from 'react';
import { UserBD } from '../../../type/user';
import { StyledCheckedItem } from '../styled';

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
          {checkedUser.name}
          <span className='close'>&#10006;</span>
        </StyledCheckedItem>
      ))}
    </div>
  );
};
