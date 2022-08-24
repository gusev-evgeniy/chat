import React, { FC, useEffect } from 'react';


import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { checkUser, createRoomsDefault, openCreateRoom, selectCreatingRoom, updateTitle } from '../../store/slices/createRoom';
import { createRoom, openNewRoom } from '../../store/actions';

import { UsersList } from './usersList';
import { Search } from './search';

import {
  StyledCheckedItem,
  StyledCreateRoom,
  StyledGroupNameIntput,
  StyledLabel,
  StyledSearchUserWrapper,
} from './styled';
import { StyledButton } from '../auth/styles';

const MAX_LENGTH = 30;

export const NewRoom: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { checked, title, type, users, loaded } = useAppSelector(selectCreatingRoom);

  const groupNameLength = title.length;
  const isGroupChat = type === 'group';

  useEffect(() => {
    return () => {
      dispatch(createRoomsDefault());
    }
  }, [])
  
  const onCheck = (id: string, checked: boolean) => dispatch(checkUser({ checked, id }));
  const onRemoveUser = (id: string) => dispatch(checkUser({ checked: false, id }));
  
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length < groupNameLength || groupNameLength < MAX_LENGTH) {
      dispatch(updateTitle({ title: value }));
    }
  };

  const createRoomHandler = async () => {
    if (isGroupChat) dispatch(createRoom());
    else dispatch(openNewRoom());

    dispatch(openCreateRoom(false))
  };

  const disabled = !checked.length || (isGroupChat && !title.trim());

  return (
    <StyledCreateRoom>
      <div className='group_name'>
        {isGroupChat && (
          <form>
            <StyledLabel htmlFor=''>group name</StyledLabel>
            <div className='input_wrapper'>
              <StyledGroupNameIntput
                type='text'
                className='search'
                placeholder='Type here'
                value={title}
                onChange={onChangeName}
              />
              <div className='count'>
                {groupNameLength}/{MAX_LENGTH}
              </div>
            </div>
          </form>
        )}
      </div>

      <StyledSearchUserWrapper padding={50}>
        <Search />

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
    </StyledCreateRoom>
  );
};
