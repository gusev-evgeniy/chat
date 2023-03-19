import React from 'react';

import { StyledButton } from 'components/auth/styles';
import { UsersList } from './usersList';
import { Form } from './form';
import { CheckedList } from './checkedList';
import { useNewRoom } from './useNewRoom';

import { Empty } from 'styles';
import { StyledSearchUserWrapper } from '../styles';

export const Search = () => {
  const {
    checked,
    createRoomHandler,
    disabled,
    loaded,
    onCheckHandler,
    onRemoveUser,
    users,
  } = useNewRoom();

  return (
    <StyledSearchUserWrapper>
      <Form />

      <UsersList
        loaded={loaded}
        users={users.data}
        onCheck={onCheckHandler}
        checked={checked}
      />

      {checked.length > 0 &&  <CheckedList checked={checked} onRemoveUser={onRemoveUser} />}

      <div className='buttons'>
        <StyledButton
          width='160px'
          height='48px'
          disabled={disabled}
          onClick={createRoomHandler}>
          Create Room
        </StyledButton>
      </div>
    </StyledSearchUserWrapper>
  );
};
