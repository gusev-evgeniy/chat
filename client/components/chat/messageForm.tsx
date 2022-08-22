import Image from 'next/image';
import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { StyledMessageForm, StyledSubmitIcon, StyledTextareaAutosize } from './styled';
import send from '../../images/send.svg';
import { socket } from '../../api/socket';
import { useAppSelector } from '../../store/hooks';
import { selectMyData } from '../../store/slices/user';
import { RoomsState } from '../../store/slices/rooms';
import { EVENTS } from '../../utils/constants';

type Props = {
  selected: RoomsState['selected'];
};

export const MessageForm: FC<Props> = memo(({ selected }) => {
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState<boolean | null>(null);
  const typingTimeoutId = useRef<NodeJS.Timeout | undefined>();

  const me = useAppSelector(selectMyData);

  useEffect(() => {
    if (!selected || typing === null) {
      return;
    }
      console.log('useEffect', useEffect)
    socket.emit(EVENTS.MESSAGE.TYPING, { user: me?.name, roomId: selected.id, isTyping: typing });
  }, [typing, selected, me?.name]);

  if (!selected || !me) {
    return null;
  }

  const onChangeHandler = ({ target }: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setTyping(true);
    clearInterval(typingTimeoutId.current);

    typingTimeoutId.current = setTimeout(() => {
      setTyping(false);
    }, 3000);

    setMessage(target.value);
  };

  const onSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let submitObject = {
      roomId: selected.id,
      message,
    };

    const isNewRoom = selected.id === null;

    if (isNewRoom) {
      socket.emit(
        EVENTS.ROOM.CREATE_PRIVATE,
        { author: me?.id, userId: selected.participants[0].id, message },
        (obj: { id?: string, message?: string}) => {

          if (obj.id) {
            submitObject.roomId = obj.id
            socket.emit(EVENTS.MESSAGE.MESSAGE_CREATE, submitObject);
          }
        }
      );
    } else {
      socket.emit(EVENTS.MESSAGE.MESSAGE_CREATE, submitObject);
    }

    setMessage('');
    clearInterval(typingTimeoutId.current);
    setTyping(false);
  };

  return (
    <StyledMessageForm onSubmit={onSubmitMessage}>
      <StyledTextareaAutosize
        placeholder='To write a message...'
        onChange={onChangeHandler}
        value={message}
        autoFocus
      />
      <StyledSubmitIcon disabled={!message.length}>
        <Image width='30px' height='30px' src={send} alt='send' />
      </StyledSubmitIcon>
    </StyledMessageForm>
  );
});

MessageForm.displayName = 'MessageForm';
