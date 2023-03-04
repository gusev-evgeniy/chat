import { useMemo, useState } from 'react';
import { uploadFile } from 'store/actions/messages';
import { useAppDispatch } from 'store/hooks';

export const useDragArea = () => {
  const [drag, setDrag] = useState(false);

  const dispatch = useAppDispatch();

  const onDragOverHandler = () => {
    setDrag(true);
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    dispatch(uploadFile(file));
    setDrag(false);
  };

  return useMemo(
    () => ({
      dropHandler,
      dragLeaveHandler,
      dragStartHandler,
      onDragOverHandler,
      drag,
    }),
    [drag]
  );
};
