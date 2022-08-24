import React, { FC, useEffect } from 'react';
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
import { checkUser, createRoomsDefault, openCreateRoom, selectCreatingRoom, updateTitle } from '../../store/slices/createRoom';
import { Search } from './search';
import { socket } from '../../api/socket';
import { selectMyData } from '../../store/slices/user';
import { UserBD } from '../../type/user';
import { addRoom, openNewPrivateChat, selectRoom } from '../../store/slices/rooms';
import { EVENTS } from '../../utils/constants';
import { instance } from '../../api';
import { Room } from '../../type/room';

const MAX_LENGTH = 30;

export const NewRoom: FC<{}> = () => {
  const dispatch = useDispatch();
  const { checked, title, type, users, loaded } = useAppSelector(selectCreatingRoom);
  const me = useAppSelector(selectMyData) as UserBD;

  const groupNameLength = title.length;
  const isGroupChat = type === 'group';

  useEffect(() => {
    return () => {
      dispatch(createRoomsDefault());
    }
  }, [])
  

  const setNewRoomIsOpen = (isOpen: boolean) => {
    dispatch(openCreateRoom(isOpen));
  };

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

  const createRoomHandler = async () => {
    try {
      if (isGroupChat) {
        const usersId = checked.map(({ id }) => id);
        socket.emit(EVENTS.ROOM.CREATE_GROUP, { author: me.id, usersId, title, type }, (newRoom: Room) => {
          dispatch(addRoom(newRoom));
          dispatch(selectRoom(newRoom.id));
        });

        return setNewRoomIsOpen(false);
      }

      const user = checked[0];
      const { data } = await instance.get(`/room/checkPrivate?user=${user.id}`);
      if (data) dispatch(selectRoom(data.id));
      else dispatch(openNewPrivateChat());
    } catch (error) {}
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
