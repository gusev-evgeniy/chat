import React, { FC } from 'react';
import { UserBD } from '../../type/user';
import { FindingUser } from './item';
import { StyledUsers } from './styled';

type Props = {
  loaded: boolean;
  users: UserBD[];
  onCheck: (id: string, checked: boolean) => void;
  checkedUsers: string[];
};

export const UsersList: FC<Props> = ({ loaded, users, onCheck, checkedUsers }) => {
  if (!loaded) {
    return <div className='empty'>Please enter the username you want to chat with.</div>;
  }

  if (loaded && !users.length) {
    return <div className='empty'>Users not found</div>;
  }

  return (
    <StyledUsers padding={0}>
      {users.map(user => {
        const checked = checkedUsers.includes(user.id);

        return <FindingUser key={user.id} {...user} onCheck={onCheck} checked={checked}/>
      })}
    </StyledUsers>
  );
};
