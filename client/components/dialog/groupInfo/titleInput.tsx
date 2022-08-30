import React, { FC, useState } from 'react';

type Props = {
  title: string;
  update: (data: { photo?: File; title?: string }) => void;
};

export const TitleInput: FC<Props> = ({ title, update }) => {
  const [newTitle, setNewTitle] = useState(title);

  const onUpdate = () => {
    if (title === newTitle.trim()) {
      return;
    }

    update({ title: newTitle.trim() });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate();
  };

  const onLeaveHandler = () => {
    onUpdate();
  };

  const onKeyHandler = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Escape') {
      setNewTitle(title);
    }
  };

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
