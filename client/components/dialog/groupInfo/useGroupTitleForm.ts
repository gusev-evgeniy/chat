import { useState } from 'react';

type Props = {
  title: string;
  update: (data: { photo?: File; title?: string }) => void;
};

export const useGroupTitleForm = ({ title, update }: Props) => {
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

  return {
    newTitle,
    onSubmit,
    onLeaveHandler,
    onKeyHandler,
    setNewTitle,
  };
};
