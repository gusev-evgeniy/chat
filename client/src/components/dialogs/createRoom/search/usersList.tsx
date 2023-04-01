import React, { FC, MouseEventHandler } from 'react';

import { CreateRoomState } from 'store/slices/createRoom';

import { FindingUser } from './item';

import { Empty } from 'styles';
import { StyledUsers } from '../styles';

type Props = {
  loaded: CreateRoomState['loaded'];
  users: CreateRoomState['users']['data'];
  onCheck: MouseEventHandler;
  checked: CreateRoomState['checked'];
};

export const UsersList: FC<Props> = ({ loaded, users, onCheck, checked }) => {
  if (!loaded) {
    return (
      <Empty margin='70px'>
        Please enter the username you want to chat with.
      </Empty>
    );
  }

  if (loaded && !users.length) {
    return <Empty margin='70px'>Users not found</Empty>;
  }

  return (
    <StyledUsers>
      <div className='users_container'>
        {users.map(user => {
          const checkedUser = checked.some(({ id }) => id === user.id);

          return (
            <FindingUser
              key={user.id}
              {...user}
              onCheck={onCheck}
              checked={checkedUser}
            />
          );
        })}
      </div>
    </StyledUsers>
  );
};
