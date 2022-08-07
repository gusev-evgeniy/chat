import React, { useEffect, useState } from 'react';
import { StyledSearchIcon, StyledSearchInput } from '../contacts/styled';
import {
  StyledCreateRoom,
  StyledFindUserIntput,
  StyledGroupNameIntput,
  StyledLabel,
  StyledSearchUserWrapper,
  StyledUsers,
} from './styled';

import search from '../../images/search.svg';
import Image from 'next/image';
import { FindingUser } from './item';
import { instance } from '../../api';
import { UsersList } from './usersList';
import { UserBD } from '../../type/user';

const MAX_LENGTH = 30;

export const NewRoom = () => {
  const [groupName, setGroupName] = useState('');
  const [filter, setFilter] = useState('');
  const [users, setUsers] = useState<UserBD[]>([]);
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

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
  const createChat = async (id: string, checked: boolean) => {
    try {
      console.log(id, checked);

      const response = await instance.post('/room/create', { userId: id });
      console.log('response', response);
    } catch (error) {}
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
