import { MessageAPI } from 'api/message';
import dayjs from 'dayjs';
import { RoomType } from 'types/room';
import { BASE_URL } from './constants';

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

export const download = async (id: string) => {
  await MessageAPI.download(id);
  const address = `${BASE_URL}attachment/${id}`

  const Id = `download-files`
  let iframe = document.getElementById(Id)
  if (iframe === null) {
    iframe = document.createElement(`iframe`)
    iframe.style.display = `none`
    iframe.id = Id

    document.body.appendChild(iframe)
  }

  return ((iframe as HTMLImageElement).src = address)
}

export const getDay = (createdAt: string) => dayjs(createdAt).format('YYYY-MM-DD');