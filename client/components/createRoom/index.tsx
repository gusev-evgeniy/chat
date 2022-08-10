import React, { useState, FC } from 'react';
import { StyledSearchIcon } from '../rooms/styled';
import {
  StyledCreateRoom,
  StyledFindUserIntput,
  StyledGroupNameIntput,
  StyledLabel,
  StyledSearchUserWrapper,
} from './styled';

import search from '../../images/search.svg';
import Image from 'next/image';
import { instance } from '../../api';
import { UsersList } from './usersList';
import { UserBD } from '../../type/user';
import { useDispatch } from 'react-redux';
import { setSelectedRoom } from '../../store/slices/rooms';

const MAX_LENGTH = 30;

type Props = {
  setNewRoomIsOpen: (isOpen: boolean) => void;
};

export const NewRoom: FC<Props> = ({ setNewRoomIsOpen }) => {
  const [groupName, setGroupName] = useState('');
  const [filter, setFilter] = useState('');
  const [users, setUsers] = useState<UserBD[]>([]);
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  const groupNameLength = groupName.length;

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length < groupNameLength || groupNameLength < MAX_LENGTH) {
      setGroupName(value);
    }
  };

  const onFindUsersHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!filter) {
      return;
    }

    try {
      const { data } = await instance.get(`user/find?name=${filter}`);

      setLoaded(true);
      setUsers(data.users);
    } catch (error) {}
  };

  const onCheck = (id: string, checked: boolean) => {
    console.log('id', id);
    console.log('checked', checked);
    if (checked) {
      return setCheckedUsers(prev => [...prev, id]);
    }

    setCheckedUsers(prev => prev.filter(user => user !== id));
  };

  //test
  const createChat = async (name: string, userId: string) => {
    dispatch(setSelectedRoom({ roomId: null, name, userId }));
    setNewRoomIsOpen(false);
  };

  console.log('checkedUsers', checkedUsers);

  return (
    <StyledCreateRoom>
      <div className='group_name'>
        {checkedUsers.length > 1 && (
          <form>
            <StyledLabel htmlFor=''>group name</StyledLabel>
            <div className='input_wrapper'>
              <StyledGroupNameIntput
                type='text'
                className='search'
                placeholder='Type here'
                value={groupName}
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
        <form onSubmit={onFindUsersHandler}>
          <StyledLabel htmlFor=''>Search</StyledLabel>
          <div className='input_wrapper'>
            <StyledFindUserIntput
              type='text'
              className='search'
              placeholder='Type usernames'
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
            <StyledSearchIcon>
              <Image width='30px' height='30px' src={search} alt='search' />
            </StyledSearchIcon>
          </div>
        </form>
        <UsersList loaded={loaded} users={users} onCheck={createChat} checkedUsers={checkedUsers} />
      </StyledSearchUserWrapper>
      {/* <div className='buttons'>

      </div> */}
    </StyledCreateRoom>
  );
};
