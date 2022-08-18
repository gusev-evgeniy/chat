import { Typing } from "../type/messages";
import { RoomType } from "../type/room";

export const returnTypingText = ( typing: Typing = [], type: RoomType = 'private') => {
  if (!typing.length) return '';
  if (type === 'private') return '...печатает'
  if (typing.length === 1) return `...${typing[0].user} печатает`
  const names = typing.map(({ user }) => user ).join(',');

  return `...${names} печатают`
}