import { useEffect, useRef, useState } from 'react';
import { updateDraft } from '@/store/actions/draft';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getDraft } from '@/store/selectors';

export const useEmoji = () => {
  const dispatch = useAppDispatch();

  const message = useAppSelector(getDraft) || '';

  const [cursorPosition, setCursorPosition] = useState<number | undefined>();
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const rextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (cursorPosition && rextareaRef.current) {
      rextareaRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);

  const addEmoji = (e: any) => {
    let sym = e.unified.split('-');
    let codesArray: string[] = [];
    sym.forEach((el: string) => codesArray.push('0x' + el));
    //@ts-ignore
    return String.fromCodePoint(...codesArray);
  };

  const pickEmoji = (e: any) => {
    const ref = rextareaRef.current;
    if (!ref) {
      return;
    }
    const emoji = addEmoji(e);

    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const text = start + emoji + end;
    dispatch(updateDraft(text));
    setCursorPosition(start.length + emoji.length);
  };

  const toggleEmoji = () => {
    setIsEmojiOpen(prev => !prev);
  };

  const closeEmoji = () => {
    setIsEmojiOpen(false);
  }

  return {
    rextareaRef,
    toggleEmoji,
    isEmojiOpen,
    pickEmoji,
    closeEmoji
  };
};
