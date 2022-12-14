import { RoomType } from "../type/room";

export const returnTypingText = ( typing: string[] | undefined, type: RoomType = 'private') => {
  if (!typing || !typing.length) return '';
  if (type === 'private') return '...types'

  return `...${typing.join(',')} печатают`
}