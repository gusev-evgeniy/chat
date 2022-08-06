import React, { FC, memo } from 'react';
import { UserBD } from '../../type/user';
import { StyledAva } from '../auth/styles';
import { MyCheckbox } from '../checkbox';
import { StyledSearchUserItem } from './styled';

type Props = UserBD & {
  onCheck: (id: string, checked: boolean) => void;
  checked: boolean;
};

export const FindingUser: FC<Props> = memo(({ photo, name, onCheck, id, checked }) => {
  const onCheckHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget.querySelector('#user_checkbox');
    console.log('item', item)
    if (item) onCheck(id, !(item as HTMLInputElement).checked);
  };

  return (
    <StyledSearchUserItem className='user_wrapper' onClick={onCheckHandler}>
      <div className='data_wrapper'>
        <StyledAva size={45} backgroundImage={photo} />
        <p className='bold'>{name}</p>
      </div>
      <MyCheckbox checked={checked} />
    </StyledSearchUserItem>
  );
});

FindingUser.displayName = 'FindingUser';
