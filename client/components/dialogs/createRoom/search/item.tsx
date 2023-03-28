import React, { FC, memo } from 'react';

import { Avatar } from 'components/avatar';
import { MyCheckbox } from 'components/checkbox';

import { UserBD } from 'types/user';

import { StyledSearchUserItem } from 'styles';

type Props = UserBD & {
  onCheck: (e: React.MouseEvent<HTMLDivElement>) => void;
  checked: boolean;
};

export const FindingUser: FC<Props> = memo(
  ({ photo, name, onCheck, id, checked, online, background }) => {
    return (
      <StyledSearchUserItem
        className='user_wrapper'
        check={true}
        data-id={id}
        onClick={onCheck}>
        <div className='data_wrapper'>
          <Avatar
            size={45}
            photo={photo}
            name={name}
            online={online}
            gradient={background}
          />
          <p className='bold'>{name}</p>
        </div>
        <MyCheckbox checked={checked} />
      </StyledSearchUserItem>
    );
  }
);

FindingUser.displayName = 'FindingUser';
