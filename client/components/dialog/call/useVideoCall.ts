import { useRef, useMemo, useEffect } from 'react';

import { useCall } from 'providers/callProvider';

export const useVideoCall = () => {
  const myVideo = useRef<HTMLVideoElement>(null);
  const callerVideo = useRef<HTMLVideoElement>(null);

  const { myStream, companionStream } = useCall();
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

  return useMemo(
    () => ({
      myVideo,
      callerVideo,
    }),
    [myVideo, callerVideo]
  );
};
