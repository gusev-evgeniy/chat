import { useEffect, useMemo, useRef, useState } from 'react';

import { createMessage, createPrivateRoom, sendTyping } from 'store/actions';
import { useAppDispatch } from 'store/hooks';

import { NEW_ROOM } from 'utils/constants';
import { prepareFile } from 'utils/message';

export const useMessageForm = (selected: string) => {
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState<boolean | null>(null);

  const typingTimeoutId = useRef<NodeJS.Timeout | undefined>();

  const isNewRoom = selected === NEW_ROOM;

  useEffect(() => {
    if (isNewRoom || typing === null) {
      return;
    }

    dispatch(sendTyping(typing));
  }, [typing, isNewRoom, dispatch]);

  const onChangeHandler = ({
    target,
  }: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setTyping(true);
    clearInterval(typingTimeoutId.current);

    typingTimeoutId.current = setTimeout(() => {
      setTyping(false);
    }, 3000);

    setMessage(target.value);
  };

  const onSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { message: message.trim() };

    if (isNewRoom) dispatch(createPrivateRoom(data));
    else createMessage(selected, data);

    setMessage('');
    clearInterval(typingTimeoutId.current);
    setTyping(false);
  };

  const onAttachFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const files = target.files;

    if (!files || files.length === 0) {
      return;
    }

    uploadFile(files[0])
  };

  const uploadFile = (fileForUpload: File) => {
    const file = prepareFile(fileForUpload);

    if (isNewRoom) dispatch(createPrivateRoom({ file }));
    else createMessage(selected, { file });
  }

  return useMemo(
    () => ({
      onSubmitMessage,
      onChangeHandler,
      message,
      onAttachFile,
      uploadFile
    }),
    [message]
  );
};
