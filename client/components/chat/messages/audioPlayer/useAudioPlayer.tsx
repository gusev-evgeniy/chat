import { useState, useEffect, useRef } from 'react';

function useAudioPlayer() {
  const [curTime, setCurTime] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

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
        stop()
      }
      setCurTime(audio.currentTime);
    }

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

  return {
    curTime: Math.trunc(curTime),
    playing,
    setClickedTime,
    audioRef,
    start,
    stop,
  };
}

export default useAudioPlayer;
