import { StyledBar } from 'components/chat/styles';
import React, { FC } from 'react';

type Props = {
  duration: number;
  curTime: number;
  onTimeUpdate: (time: number | null) => void;
}

export const Bar: FC<Props> = ({ duration, curTime, onTimeUpdate }) => {
  const curPercentage = (curTime / duration) * 100;

  function calcClickedTime(e: MouseEvent | React.MouseEvent<HTMLDivElement>) {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector('.bar_progress');
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
    <StyledBar>
      <div
        className='bar_progress'
        style={{
          background: `linear-gradient(to right, #025EFD ${curPercentage}%, #E4E4EC 0)`,
        }}
        onMouseDown={handleTimeDrag}>
        <span
          className='knob'
          style={{ left: `${curPercentage - 2}%` }}
        />
      </div>
    </StyledBar>
  );
};
