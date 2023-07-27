import { useRef, useEffect } from 'react';

import { useCall } from '@/providers/call/callProvider';

export const useVideoCall = () => {
  const { myStream, companionStream } = useCall();

  const myVideo = useRef<HTMLVideoElement>(null);
  const callerVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (callerVideo.current) {
      callerVideo.current.srcObject = companionStream;
    }
  }, [callerVideo, companionStream]);

  useEffect(() => {
    if (myVideo.current) {
      myVideo.current.srcObject = myStream;
    }
  }, [myVideo, myStream]);

  useEffect(() => {
    const button = document.getElementById('fullscreen_button');
    if (!button) {
      return;
    }

    const openFullscreen = () => {
      const elem = callerVideo.current as any;
      if (!elem) {
        return;
      }

      /* Function to open fullscreen mode */
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    };

    button.addEventListener('click', openFullscreen);

    return () => {
      button.addEventListener('click', openFullscreen);
    };
  }, []);

  return {
    myVideo,
    callerVideo,
  };
};
