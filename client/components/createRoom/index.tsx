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
import { socket } from '../../api/socket';
import { selectMyData } from '../../store/slices/user';
import { UserBD } from '../../type/user';
import { selectRoom } from '../../store/slices/rooms';
import { EVENTS } from '../../utils/constants';

const MAX_LENGTH = 30;

type Props = {
  setNewRoomIsOpen: (isOpen: boolean) => void;
};

export const NewRoom: FC<Props> = ({ setNewRoomIsOpen }) => {

  const dispatch = useDispatch();
  const { checked, title, type, users, loaded } = useAppSelector(selectCreatingRoom);
  const me = useAppSelector(selectMyData) as UserBD;

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
  const createRoomHandler = async () => {
    if (isGroupChat) {
      const usersId = checked.map(({ id }) => id);
      socket.emit(EVENTS.ROOM.CREATE_GROUP, { author: me.id, usersId, title, type })

      setNewRoomIsOpen(false);
    }
    const user = checked[0];

      dispatch(selectRoom({ roomId: null, name: user.name, userId: user.id, type: 'private' }));
      setNewRoomIsOpen(false);
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
