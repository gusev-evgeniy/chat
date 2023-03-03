import { RoomType } from 'types/room';

export const returnTypingText = (
  typing: string[] | undefined,
  type: RoomType = 'private'
) => {
  if (!typing || !typing.length) return '';
  if (type === 'private') return '...types';

  return `...${typing.join(',')} печатают`;
};

export const prepareFile = (content: File) => {
  const { name, size, type } = content;

  return {
    name,
    size,
    type,
    content,
  };
};
