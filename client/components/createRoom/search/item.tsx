import React, { FC, memo } from 'react';
import { UserBD } from '../../../type/user';
import { Avatar } from '../../avatar';
import { MyCheckbox } from '../../checkbox';
import { StyledSearchUserItem } from '../styled';

type Props = UserBD & {
  onCheck: (e: React.MouseEvent<HTMLDivElement>) => void;
  checked: boolean;
};

export const FindingUser: FC<Props> = memo(
  ({ photo, name, onCheck, id, checked, online }) => {
    return (
      <StyledSearchUserItem
        className='user_wrapper'
        check={true}
        data-id={id}
        onClick={onCheck}
      >
        <div className='data_wrapper'>
          <Avatar size={45} photo={photo} name={name} online={online} />
          <p className='bold'>{name}</p>
        </div>
        <MyCheckbox checked={checked} />
      </StyledSearchUserItem>
    );
  }
);

FindingUser.displayName = 'FindingUser';
