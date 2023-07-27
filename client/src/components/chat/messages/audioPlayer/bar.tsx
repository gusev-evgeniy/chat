import { StyledBar } from '@/components/chat/styles';
import React, { FC } from 'react';

type Props = {
  duration: number;
  curTime: number;
  onTimeUpdate: (time: number | null) => void;
  id: string;
}

export const Bar: FC<Props> = ({ duration, curTime, onTimeUpdate, id }) => {
  const curPercentage = (curTime / duration) * 100;
  const ID = `${id}_bar_progress`;

  function calcClickedTime(e: MouseEvent | React.MouseEvent<HTMLDivElement>) {
    const clickPositionInPage = e.pageX;
    const bar = document.getElementById(ID)
    if (!bar) {
      return null;
    }

    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = (bar as HTMLElement).offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e: React.MouseEvent<HTMLDivElement>) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = (eMove: MouseEvent) => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener('mousemove', updateTimeOnMove);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', updateTimeOnMove);
    });
  }

  return (
    <StyledBar curPercentage={curPercentage}>
      <div
        id={ID}
        className='bar_progress'
        onMouseDown={handleTimeDrag}>
        <span
          className='knob'
          style={{ left: `${curPercentage - 2}%` }}
        />
      </div>
    </StyledBar>
  );
};
