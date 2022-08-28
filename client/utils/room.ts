import { Room } from "../type/room";
import { UserBD } from "../type/user";

export const getRoomInfo = ({ type, title: roomTitle, id: roomId, participants }: Room, myId: string) => {
  if (type === 'group') {
    return { image: null, title: roomTitle as string, id: roomId, online: false };
  }
  const { id, name, photo, online } = participants.find(({ id }) => id !== myId) as UserBD;
  return { id, title: name, image: photo, online };
}