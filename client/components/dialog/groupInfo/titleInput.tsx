import React, { FC, useState } from 'react';
import { useGroupTitleForm } from './useGroupTitleForm';

type Props = {
  title: string;
  update: (data: { photo?: File; title?: string }) => void;
};

export const TitleInput: FC<Props> = (props) => {
  const { newTitle, onKeyHandler, onLeaveHandler, onSubmit, setNewTitle } = useGroupTitleForm(props);

  return (
    <div className='group_title'>
      <form onSubmit={onSubmit}>
        <input
          onBlur={onLeaveHandler}
          type='text'
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
          onKeyUp={onKeyHandler}
        />
      </form>
    </div>
  );
};
