import { useEffect, useState } from 'react';

export const useStopWatch = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const start = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const reset = () => {
    setIsActive(false);
    setTime(0);
  };

  return {
    time,
    start,
    reset,
  };
};
