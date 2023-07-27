import { useCall } from '@/providers/call/callProvider';
import { useEffect, useRef, useState } from 'react';
import { createMessageOrPrivateRoom } from '@/store/actions/room';
import { useAppDispatch } from '@/store/hooks';

export const useRecord = () => {
  const dispatch = useAppDispatch();

  const { isGetCall } = useCall();

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isGetCall) {
      setMediaRecorder(null);
      setIsRecording(false);
      streamRef.current?.getTracks().forEach(track => track.stop());
    }
  }, [isGetCall]);

  const onRecord = async () => {
    streamRef.current = await window.navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    onRecording();
  };

  const onRecording = () => {
    if (!streamRef.current) {
      return;
    }

    const recorder = new MediaRecorder(streamRef.current);
    setMediaRecorder(recorder);

    recorder.start();

    recorder.onstart = () => {
      setIsRecording(true);
    };

    recorder.onstop = () => {
      setIsRecording(false);
      streamRef.current?.getTracks().forEach(track => track.stop());
    };
  };

  const stop = () => {
    mediaRecorder?.stop();
  };

  const submit = () => {
    stop();

    if (mediaRecorder) {
      mediaRecorder.ondataavailable = e => {
        const media = new File([e.data], 'audio.webm');
        dispatch(createMessageOrPrivateRoom({ media }));
      };
    }
  };

  return {
    stop,
    onRecord,
    submit,
    isRecording,
  }
};
