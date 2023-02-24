import { useRef, useMemo, useEffect } from "react"
import { useCall } from "../../providers/callProvider";

export const useVideoCall = () => {
  const myVideo = useRef<HTMLVideoElement>(null);
  const callerVideo = useRef<HTMLVideoElement>(null);

  const { myStream, callerStream } = useCall();
  console.log('callerStream', callerStream)
  console.log('myStream', myStream)

  useEffect(() => {
    if (callerVideo.current && callerStream) {
      callerVideo.current.srcObject = callerStream;
    }
  }, [callerVideo, callerStream])

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