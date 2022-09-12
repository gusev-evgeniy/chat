import React, { FC, memo, useCallback, useMemo } from 'react';
import { CreateRoomState } from '../../../store/slices/createRoom';
import { Empty } from '../../../styles';
import { FindingUser } from './item';
import { StyledUsers } from '../styled';

type Props = {
  loaded: CreateRoomState['loaded'];
  users: CreateRoomState['users']['data'];
  onCheck: (id: string, checked: boolean) => void;
  checked: CreateRoomState['checked'];
};

export const UsersList: FC<Props> = ({ loaded, users, onCheck, checked }) => {

  const onCheckHandler = useCallback((e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    const item = e.currentTarget.querySelector('#user_checkbox') as HTMLInputElement;
    if (item) onCheck(id, !item.checked);
  }, []);

  if (!loaded) {
    return <Empty margin='70px'>Please enter the username you want to chat with.</Empty>;
  }

  if (loaded && !users.length) {
    return <Empty margin='70px'>Users not found</Empty>;
  }

  return (
    <StyledUsers>
      {users.map(user => {
        const checkedUser = checked.some(({ id }) => id === user.id);

        return (
          <FindingUser
            key={user.id}
            {...user}
            onCheckHandler={onCheckHandler}
            checked={checkedUser}
          />
        );
      })}
    </StyledUsers>
  );
};
