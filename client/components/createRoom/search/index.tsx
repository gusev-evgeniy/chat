import React from 'react';
import { createRoom, openNewRoom } from '../../../store/actions';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectCreatingRoom } from '../../../store/selectors';
import { checkUser, openCreateRoom } from '../../../store/slices/createRoom';
import { StyledButton } from '../../auth/styles';
import { StyledCheckedItem, StyledSearchUserWrapper } from '../styled';
import { UsersList } from './usersList';
import { Form } from './form';

export const Search = () => {
  const { checked, title, type, users, loaded } = useAppSelector(selectCreatingRoom);

  const dispatch = useAppDispatch();

  const isGroupChat = type === 'group';
  const disabled = !checked.length || (isGroupChat && !title.trim());

  const onCheck = (id: string, checked: boolean) => dispatch(checkUser({ checked, id }));
  const onRemoveUser = (id: string) => dispatch(checkUser({ checked: false, id }));

  const createRoomHandler = async () => {
    if (isGroupChat) dispatch(createRoom());
    else dispatch(openNewRoom());

    dispatch(openCreateRoom(false));
  };

  return (
    <StyledSearchUserWrapper padding={50}>
      <Form />

      <div className='checked_list'>
        {checked.map(checkedUser => (
          <StyledCheckedItem key={checkedUser.id} onClick={() => onRemoveUser(checkedUser.id)}>
            {checkedUser.name}
            <span className='close'>&#10006;</span>
          </StyledCheckedItem>
        ))}
      </div>

      <UsersList loaded={loaded} users={users.data} onCheck={onCheck} checked={checked} />

      {loaded && users.data.length > 0 && (
        <div className='buttons'>
          <StyledButton width='160px' height='48px' disabled={disabled} onClick={createRoomHandler}>
            Create Room
          </StyledButton>
        </div>
      )}
    </StyledSearchUserWrapper>
  );
};
