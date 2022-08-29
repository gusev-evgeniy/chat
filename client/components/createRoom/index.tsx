import React, { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createRoomsDefault, selectCreatingRoom, updateTitle } from '../../store/slices/createRoom';

import { Search } from './search';

import {
  StyledCreateRoom,
  StyledGroupNameIntput,
  StyledLabel,
} from './styled';

const MAX_LENGTH = 20;

export const NewRoom: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { title, type} = useAppSelector(selectCreatingRoom);

  const groupNameLength = title.length;
  const isGroupChat = type === 'group';

  useEffect(() => {
    return () => {
      dispatch(createRoomsDefault());
    }
  }, [])
  
  
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length < groupNameLength || groupNameLength < MAX_LENGTH) {
      dispatch(updateTitle({ title: value }));
    }
  };

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

      <Search />
    </StyledCreateRoom>
  );
};
