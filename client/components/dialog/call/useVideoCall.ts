import { useRef, useMemo, useEffect } from "react"
import { useCall } from "../../providers/callProvider";

export const useVideoCall = () => {
  const myVideo = useRef<HTMLVideoElement>(null);
  const callerVideo = useRef<HTMLVideoElement>(null);

  const { myStream, companionStream } = useCall();
  console.log('companionStream', companionStream)
  console.log('myStream', myStream)

  useEffect(() => {
    if (callerVideo.current && companionStream) {
      callerVideo.current.srcObject = companionStream;
    }
  }, [callerVideo, companionStream])

  useEffect(() => {
    if (myVideo.current && myStream) {
      myVideo.current.srcObject = myStream;
    }
  }, [myVideo, myStream])


  return useMemo(() => ({
    myVideo,
    callerVideo
  }), [myVideo, callerVideo,])
}