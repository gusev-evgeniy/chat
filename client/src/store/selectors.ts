import { createSelector } from '@reduxjs/toolkit';

import { NEW_ROOM } from 'utils/constants';
import { returnTypingText } from 'utils/message';

import { RootState } from 'store';
import { Rooms } from './slices/rooms';

export const selectRooms = (state: RootState) => state.rooms;
export const selectMessages = (state: RootState) => state.messages.data;
export const selectMyData = (state: RootState) => state.user.data;
export const selectCreatingRoom = (state: RootState) => state.createRoom;
export const selectSideMenu = (state: RootState) => state.sideMenu;
export const selectDialogName = (state: RootState) => state.dialog.name;
export const selectDraft = (state: RootState) => state.draft;
export const selectError = (state: RootState) =>
  state.errorReducer.errorMessage;
export const selectSearch = (state: RootState) => state.search;

export const getChatData = createSelector(
  selectRooms,
  selectMessages,
  ({ selected, data }, room) => {
    const openRoom = data.find(({ id }) => id === selected);
    const {
      loaded,
      count,
      messages = [],
    } = room[selected as string] || ({} as Rooms[0]);

    const typingText = returnTypingText(openRoom);

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
  selectMyData,
  selectSearch,
  ({ selected, data }, myData, { value: search }) => {
    const rooms = search
      ? data.filter(({ title }) => title.toLowerCase().includes(search))
      : data;

    return {
      rooms,
      me: myData,
      selected,
      search,
    };
  }
);

export const getHeaderInfo = createSelector(
  selectRooms,
  selectMyData,
  ({ selected, newPrivateRoom, data: rooms }, myData) => {
    const isNewRoom: boolean = selected === NEW_ROOM;

    const selectedRoom = isNewRoom
      ? newPrivateRoom
      : rooms.find(({ id }) => id === selected)!;
    const {
      type: selectedRoomType,
      title: selectedRoomTitle,
      participants,
    } = selectedRoom;

    const privateUser =
      selectedRoomType === 'private'
        ? participants.find(participant => participant.id !== myData?.id)
        : undefined;

    const online = privateUser?.online;
    const title = privateUser?.name || selectedRoomTitle;

    return {
      isNewRoom,
      online,
      title,
      type: selectedRoomType,
      myId: myData?.id,
      userId: privateUser && privateUser.id,
      selected,
      privateUser,
      participants,
    };
  }
);

export const GetGroupChatInfo = createSelector(
  selectRooms,
  selectMyData,
  ({ selected, data }, myData) => {
    const openRoom = data.find(({ id }) => id === selected);

    if (!openRoom || !selected) {
      return null;
    }

    const { id, title, participants, image, background } = openRoom;

    return {
      participants,
      id,
      title,
      image,
      myId: myData?.id,
      background,
    };
  }
);

export const getSecetRoom = createSelector(
  selectCreatingRoom,
  ({ checked, title, type, users, loaded }) => {
    const isGroupChat = type === 'group';

    return {
      users,
      loaded,
      checked,
      title,
      isGroupChat,
    };
  }
);

export const getDraft = createSelector(
  selectDraft,
  selectRooms,
  ({ data }, { selected }) => {
    return selected ? data[selected] : undefined;
  }
);
