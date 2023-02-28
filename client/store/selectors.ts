import { createSelector } from '@reduxjs/toolkit';

import { NEW_ROOM } from 'utils/constants';
import { returnTypingText } from 'utils/message';
import { createOnlineSubstring } from 'utils/room';

import { RootState } from 'store';
import { RoomMessages } from 'types/room';

export const selectRooms = (state: RootState) => state.rooms;
export const selectMessages = (state: RootState) => state.messages;
export const selectMyData = (state: RootState) => state.user.data;
export const selectCreatingRoom = (state: RootState) => state.createRoom;
export const selectCreatingRoomOpen = (state: RootState) =>
  state.createRoom.open;

export const getChatData = createSelector(
  selectRooms,
  selectMessages,
  ({ data: rooms, selected }, { data, typing }) => {
    const openRoom = rooms.find(({ id }) => id === selected);
    const {
      messages = [],
      loaded,
      count,
    } = data[selected as string] || ({} as RoomMessages);

    const typingInChat = selected ? typing[selected] : [];
    const typingText = returnTypingText(typingInChat, openRoom?.type);

    return {
      typingText,
      messages,
      selected,
      unreadedMessagesCount: openRoom?.unreadedMessagesCount,
      loaded,
      count,
    };
  }
);

export const getRoomsInfo = createSelector(
  selectRooms,
  selectMessages,
  selectMyData,
  selectCreatingRoomOpen,
  ({ data: rooms, selected }, { typing }, myData, open) => {
    return {
      typing,
      rooms,
      me: myData,
      selected,
      isCreatRoomOpen: open,
    };
  }
);

export const getHeaderInfo = createSelector(
  selectRooms,
  selectMyData,
  selectCreatingRoom,
  ({ selected, data }, myData, { checked, type }) => {
    const isNewRoom = selected === NEW_ROOM;

    const selectedRoom = isNewRoom
      ? { type, participants: checked, title: undefined }
      : data.find(({ id }) => id === selected)!;

    const {
      participants,
      type: selectedRoomType,
      title: selectedRoomTitle,
    } = selectedRoom;

    const privateUser =
      selectedRoomType === 'private'
        ? participants.find(participant => participant.id !== myData?.id)
        : undefined;

    const online = privateUser?.online;
    const substring = createOnlineSubstring(privateUser, participants);

    const title = privateUser?.name || selectedRoomTitle;

    return {
      isNewRoom,
      online,
      substring,
      title,
      type: selectedRoomType,
      myId: myData?.id,
      userId: privateUser && privateUser.id,
      selected,
      privateUser,
    };
  }
);

export const GetGroupChatInfo = createSelector(
  selectRooms,
  selectMyData,
  ({ data, selected }, myData) => {
    const openRoom = data.find(({ id }) => id === selected);

    if (!openRoom) {
      return null;
    }

    const { participants, id, title, photo } = openRoom;

    return {
      participants,
      id,
      title,
      photo,
      myId: myData?.id,
    };
  }
);

export const getSecetRoom = createSelector(
  selectCreatingRoom,
  ({ checked, title, type, users, loaded }) => {
    const isGroupChat = type === 'group';
    const disabled = !checked.length || (isGroupChat && !title.trim());

    return {
      users,
      loaded,
      disabled,
      checked,
      title,
      isGroupChat
    };
  }
);
