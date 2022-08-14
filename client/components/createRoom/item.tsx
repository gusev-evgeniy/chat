import React, { FC, memo } from 'react';
import { UserBD } from '../../type/user';
import { Avatar } from '../avatar';
import { MyCheckbox } from '../checkbox';
import { StyledSearchUserItem } from './styled';

type Props = UserBD & {
  onCheck: (id: string, checked: boolean) => void;
  checked: boolean;
};

export const FindingUser: FC<Props> = memo(({ photo, name, onCheck, id, checked, online }) => {

  const onCheckHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const item = e.currentTarget.querySelector('#user_checkbox') as HTMLInputElement;
    if (item) onCheck(id, !item.checked);
  };

  return (
    <StyledSearchUserItem className='user_wrapper' onClick={onCheckHandler}>
      <div className='data_wrapper'>
        <Avatar size={45} photo={photo} name={name} online={online} />
        <p className='bold'>{name}</p>
      </div>
      <MyCheckbox checked={checked} />
    </StyledSearchUserItem>
  );
});

FindingUser.displayName = 'FindingUser';
