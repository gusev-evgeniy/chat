import { useRef, useMemo, useEffect } from 'react';

import { useCall } from 'providers/call/callProvider';

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

  const toggleFullScreen = () => {

    if (callerVideo.current) {
      callerVideo.current.requestFullscreen();
    }

    // const el = callerVideo.current;

    // if (!el) {
    //   return;
    // }


    // if (el.requestFullscreen) {
    //   el.requestFullscreen();
    // } else if (el.msRequestFullscreen) {
    //   el.msRequestFullscreen();
    // } else if (el.mozRequestFullScreen) {
    //   el.mozRequestFullScreen();
    // } else if (el.webkitRequestFullscreen) {
    //   el.webkitRequestFullscreen();
    // }
  };

  return useMemo(
    () => ({
      myVideo,
      callerVideo,
      toggleFullScreen
    }),
    [myVideo, callerVideo]
  );
};
