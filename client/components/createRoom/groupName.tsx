import React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCreatingRoom, updateTitle } from '../../store/slices/createRoom';

import { StyledGroupNameIntput, StyledLabel } from './styled';

const MAX_LENGTH = 20;

export const GroupName = () => {
  const dispatch = useAppDispatch();
  const { title, type } = useAppSelector(selectCreatingRoom);

  const groupNameLength = title.length;
  const isGroupChat = type === 'group';

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length < groupNameLength || groupNameLength < MAX_LENGTH) {
      dispatch(updateTitle({ title: value }));
    }
  };

  if (!isGroupChat) {
    return <div className='group_name'/>;
  }

  return (
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
  )
}
