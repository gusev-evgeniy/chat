import React from 'react';

import { StyledButton } from '../../auth/styles';
import { StyledSearchUserWrapper } from '../styled';
import { UsersList } from './usersList';
import { Form } from './form';
import { CheckedList } from './checkedList';
import { useNewRoom } from './useNewRoom';
import { Empty } from '../../../styles';

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
    <StyledSearchUserWrapper padding={'50px'}>
      <Form />

      {!loaded ? (
        <Empty margin='70px'>
          Please enter the username you want to chat with.
        </Empty>
      ) : (
        <>
          <CheckedList checked={checked} onRemoveUser={onRemoveUser} />

          <UsersList
            loaded={loaded}
            users={users.data}
            onCheck={onCheckHandler}
            checked={checked}
          />

          {loaded && (
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
        </>
      )}
    </StyledSearchUserWrapper>
  );
};
