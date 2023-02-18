import React from 'react';
import { createRoom, openNewRoom } from '../../../store/actions';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getSecetRoom } from '../../../store/selectors';
import { checkUser, openCreateRoom } from '../../../store/slices/createRoom';

import { StyledButton } from '../../auth/styles';
import { StyledSearchUserWrapper } from '../styled';
import { UsersList } from './usersList';
import { Form } from './form';
import { CheckedList } from './checkedList';
import { useSearch } from './useSearch';

export const Search = () => {
  const {
    checked,
    createRoomHandler,
    disabled,
    loaded,
    onCheckHandler,
    onRemoveUser,
    users,
  } = useSearch();

  const showButton = loaded && users.data.length > 0;

  return (
    <StyledSearchUserWrapper padding={'50px'}>
      <Form />

      <CheckedList checked={checked} onRemoveUser={onRemoveUser} />

      <UsersList
        loaded={loaded}
        users={users.data}
        onCheck={onCheckHandler}
        checked={checked}
      />

      {showButton && (
        <div className='buttons'>
          <StyledButton
            width='160px'
            height='48px'
            disabled={disabled}
            onClick={createRoomHandler}>
            Create Room
          </StyledButton>
        </div>
      )}
    </StyledSearchUserWrapper>
  );
};
