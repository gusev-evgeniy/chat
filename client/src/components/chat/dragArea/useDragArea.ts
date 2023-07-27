import { DragEvent, useState } from 'react';
import { uploadFile } from '@/store/actions/room';
import { useAppDispatch } from '@/store/hooks';

export const useDragArea = () => {
  const [drag, setDrag] = useState(false);

  const dispatch = useAppDispatch();

  const onDragOverHandler = () => {
    setDrag(true);
  };

  const dragStartHandler = (e: DragEvent) => {
    e.preventDefault();
  };

  const dragLeaveHandler = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
  };

  const dropHandler = (e: DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    dispatch(uploadFile(file));
    setDrag(false);
  };

  return {
    dropHandler,
    dragLeaveHandler,
    dragStartHandler,
    onDragOverHandler,
    drag,
  };
};
