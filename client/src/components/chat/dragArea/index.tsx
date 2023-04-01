import React, { DragEventHandler, FC, useEffect } from 'react';

import { StyledDraggingWrapper } from '../styles';

type Props = {
  dropHandler: DragEventHandler;
  dragStartHandler: DragEventHandler;
  dragLeaveHandler: DragEventHandler;
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
            To upload a file, drag it to this area
          </div>
        </div>
      </form>
    </StyledDraggingWrapper>
  );
};
