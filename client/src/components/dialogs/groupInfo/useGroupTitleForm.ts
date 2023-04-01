import { FormEvent, KeyboardEvent, useState } from 'react';

type Props = {
  title: string;
  update: (data: { photo?: File; title?: string }) => void;
};

export const useGroupTitleForm = ({ title, update }: Props) => {
  const [newTitle, setNewTitle] = useState(title);

  const onUpdate = () => {
    const trimValue = newTitle.trim();

    if (title === trimValue || !trimValue) {
      return setNewTitle(title);
    }

    update({ title: trimValue });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate();
  };

  const onLeaveHandler = () => {
    onUpdate();
  };

  const onKeyHandler = ({ key }: KeyboardEvent) => {
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
