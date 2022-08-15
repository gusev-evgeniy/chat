import React, { FC } from 'react';
import {
  StyledCheckedItem,
  StyledCreateRoom,
  StyledGroupNameIntput,
  StyledLabel,
  StyledSearchUserWrapper,
} from './styled';

import { UsersList } from './usersList';
import { useDispatch } from 'react-redux';
import { StyledButton } from '../auth/styles';
import { useAppSelector } from '../../store/hooks';
import { checkUser, selectCreatingRoom, updateTitle } from '../../store/slices/createRoom';
import { Search } from './search';

const MAX_LENGTH = 30;

type Props = {
  setNewRoomIsOpen: (isOpen: boolean) => void;
};

export const NewRoom: FC<Props> = ({ setNewRoomIsOpen }) => {

  const dispatch = useDispatch();
  const { checked, title, type, users, loaded } = useAppSelector(selectCreatingRoom);

  const groupNameLength = title.length;
  const isGroupChat = type === 'group';

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length < groupNameLength || groupNameLength < MAX_LENGTH) {
      dispatch(updateTitle({ title: value }));
    }
  };

  const onCheck = (id: string, checked: boolean) => {
    dispatch(checkUser({ checked, id }));
  };

  const onRemoveUser = (id: string) => {
    dispatch(checkUser({ checked: false, id }));
  };

  //test
  const createRoomHandler = async (name: string) => {
    if (!isGroupChat) {
      // dispatch(selectRoom({ roomId: null, name, userId: checked[0] }));
      setNewRoomIsOpen(false);
    }
  };

  const disabled = !checked.length || (isGroupChat && !title.trim());
  console.log('out')
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
            <StyledButton width='160px' height='48px' disabled={disabled}>
              Create Room
            </StyledButton>
          </div>
        )}
      </StyledSearchUserWrapper>
    </StyledCreateRoom>
  );
};
