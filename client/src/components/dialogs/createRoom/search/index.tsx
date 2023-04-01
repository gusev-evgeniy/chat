import React, { FC } from 'react';

import { StyledButton } from 'components/auth/styles';
import { UsersList } from './usersList';
import { Form } from './form';
import { CheckedList } from './checkedList';
import { useNewRoom } from './useNewRoom';

import { StyledSearchUserWrapper } from '../styles';
import { DialogWrapper } from 'components/dialogs/wrapper';

type Props = {
  nextStep: () => void;
};

export const Search: FC<Props> = ({ nextStep }) => {
  const {
    checked,
    createRoomHandler,
    loaded,
    onCheckHandler,
    onRemoveUser,
    users,
  } = useNewRoom();

  const isGroupChat = checked.length > 1;

  return (
    <DialogWrapper>
      <StyledSearchUserWrapper>
        <Form />

        <CheckedList checked={checked} onRemoveUser={onRemoveUser} />

        <UsersList
          loaded={loaded}
          users={users.data}
          onCheck={onCheckHandler}
          checked={checked}
        />

        <div className='buttons'>
          <StyledButton
            width='160px'
            height='43px'
            disabled={!checked.length}
            onClick={isGroupChat ? nextStep : createRoomHandler}>
            {isGroupChat ? (
              <>
                Next
                <span className='arrow'>&rarr;</span>
              </>
            ) : (
              <>Create Room</>
            )}
          </StyledButton>
        </div>
      </StyledSearchUserWrapper>
    </DialogWrapper>
  );
};
