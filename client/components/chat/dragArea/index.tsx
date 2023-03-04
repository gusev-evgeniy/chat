import React, { FC, useEffect } from 'react';

import { StyledDraggingWrapper } from '../styles';

type Props = {
  dropHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dragStartHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dragLeaveHandler: (e: React.DragEvent<HTMLDivElement>) => void;
};

export const DraggingArea: FC<Props> = ({
  dropHandler,
  dragLeaveHandler,
  dragStartHandler,
}) => {
  useEffect(() => {
    window.addEventListener('dragover', e => e.preventDefault());
    window.addEventListener('drop', e => e.preventDefault());
    return () => {
      window.addEventListener('dragover', e => e.preventDefault());
      window.addEventListener('drop', e => e.preventDefault());
    };
  }, []);

  return (
    <StyledDraggingWrapper>
      <form
        method='post'
        encType='multipart/form-data'
        onSubmit={e => e.preventDefault()}>
        <div
          className='drag-area'
          onDrop={dropHandler}
          onDragStart={dragStartHandler}
          onDragLeave={dragLeaveHandler}>
          <div className='drag-label'>
            Для загрузки файла перетащите его в эту область
          </div>
        </div>
      </form>
    </StyledDraggingWrapper>
  );
};
