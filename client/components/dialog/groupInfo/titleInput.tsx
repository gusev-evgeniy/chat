import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';

type Props = {
  title: string;
};

export const TitleInput: FC<Props> = ({ title }) => {
  const [active, setActive] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const dispatch = useAppDispatch();

  const onSubmit = () => {
    if (title.trim() === newTitle) {
      return;
    }
  };

  const onLeaveHandler = () => {
    setNewTitle(title);
    setActive(false);
  };

  const onKeyHandler = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Escape') {
      onLeaveHandler();
    }
  };

  return (
    <div className='group_title'>
      {!active ? (
        <form>
          <input
            onBlur={onLeaveHandler}
            type='text'
            value={newTitle}
            autoFocus
            onChange={({ target }) => setNewTitle(target.value)}
            onKeyUp={onKeyHandler}
          />
        </form>
      ) : (
        <p onClick={() => setActive(true)}>{title}</p>
      )}
    </div>
  );
};
