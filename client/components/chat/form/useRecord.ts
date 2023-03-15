import { useMemo, useState } from 'react';
import { createMessageOrPrivateRoom } from 'store/actions/messages';
import { useAppDispatch } from 'store/hooks';

export const useRecord = () => {
  const dispatch = useAppDispatch();

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const onRecord = async () => {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    onRecording(stream);
  };

  const onRecording = (stream: MediaStream) => {
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.start();

    recorder.onstart = () => {
      setIsRecording(true);
    };

    recorder.onstop = () => {
      setIsRecording(false);
    };

    recorder.ondataavailable = e => {
      const media = new File([e.data], 'audio.webm');
      dispatch(createMessageOrPrivateRoom({ media }));
      
      stream.getTracks().forEach(track => track.stop());
    };
  };

  const stopRecord = () => {
    mediaRecorder?.stop();
  };

  return useMemo(
    () => ({
      stopRecord,
      onRecord,
      isRecording,
    }),
    [isRecording]
  );
};
