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
import { selectRoom } from '../../store/slices/rooms';
import { StyledButton } from '../auth/styles';

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
  const isGroupChat = checkedUsers.length > 1;

  const onChangeName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('e.target', e);
    if (!groupNameLength && e.key === ' ') {
      return;
    }

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
    if (checked) {
      return setCheckedUsers(prev => [...prev, id]);
    }

    setCheckedUsers(prev => prev.filter(user => user !== id));
  };

  //test
  const createRoomHandler = async (name: string) => {
    if (!isGroupChat) {
      dispatch(selectRoom({ roomId: null, name, userId: checkedUsers[0] }));
      setNewRoomIsOpen(false);
    }


  };

  const disabled = !checkedUsers.length || (isGroupChat && !groupName.trim());

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
                value={groupName}
                onKeyDown={onChangeName}
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

        <UsersList loaded={loaded} users={users} onCheck={onCheck} checkedUsers={checkedUsers} />

        {loaded && users.length > 0 && (
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
