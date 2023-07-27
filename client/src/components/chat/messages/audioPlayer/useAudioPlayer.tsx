import { useCall } from '@/providers/call/callProvider';
import { useState, useEffect, useRef } from 'react';

export const useAudioPlayer = () => {
  const { isGetCall } = useCall();

  const [curTime, setCurTime] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isGetCall) stop();
  }, [isGetCall]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    const audio = audioRef.current;

    const setAudioData = () => {
      if (audio.duration === Infinity) {
        audio.currentTime = 10000000;
        setTimeout(() => {
          audio.currentTime = 0;
        }, 1000);
      }
    };

    const setAudioTime = () => {
      if (playing && audio.duration === audio.currentTime) {
        audio.currentTime = 0;
        stop();
      }
      setCurTime(audio.currentTime);
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [audioRef, playing]);

  const start = () => {
    audioRef.current?.play();
    setPlaying(true);
  };

  const stop = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  const rewind = (time: number | null) => {
    if (time === null || !audioRef.current) {
      return;
    }

    audioRef.current.currentTime = time;
    setClickedTime(time);
  };

  return {
    curTime: Math.trunc(curTime),
    playing,
    audioRef,
    start,
    stop,
    rewind,
  };
};
