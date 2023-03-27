import { createSelector } from '@reduxjs/toolkit';

import { NEW_ROOM } from 'utils/constants';
import { returnTypingText } from 'utils/message';
import { createOnlineSubstring } from 'utils/room';

import { RootState } from 'store';
import { RoomMessages } from 'types/room';

export const selectRooms = (state: RootState) => state.rooms;
export const selectRoomData = (state: RootState) => state.room.data;
export const selectMyData = (state: RootState) => state.user.data;
export const selectCreatingRoom = (state: RootState) => state.createRoom;
export const selectSideMenu = (state: RootState) => state.sideMenu;
export const selectDialogName = (state: RootState) => state.dialog.name;
export const selectDraft = (state: RootState) => state.draft;
export const selectError = (state: RootState) => state.errorReducer.errorMessage;

export const getChatData = createSelector(
  selectRooms,
  selectRoomData,
  ({ data: rooms, selected }, data) => {
    const openRoom = rooms.find(({ id }) => id === selected);
    const {
      messages = [],
      loaded,
      count,
    } = data[selected as string] || ({} as RoomMessages);

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
  ({ data, selected, filter }, myData) => {
    const rooms = filter
      ? data.filter(({ title }) => title.toLowerCase().includes(filter))
      : data;
    console.log('rooms', rooms)
    return {
      rooms,
      me: myData,
      selected,
      filter,
    };
  }
);

export const getHeaderInfo = createSelector(
  selectRooms,
  selectMyData,
  ({ selected, data, newPrivateRoom }, myData) => {
    const isNewRoom = selected === NEW_ROOM;

    const selectedRoom = isNewRoom
      ? newPrivateRoom
      : data.find(({ id }) => id === selected)!;

    const {
      type: selectedRoomType,
      title: selectedRoomTitle,
      participants
    } = selectedRoom;

    const privateUser =
      selectedRoomType === 'private'
        ? participants.find(participant => participant.id !== myData?.id)
        : undefined;
    const online = selectedRoom?.online;
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

    if (!openRoom || !selected) {
      return null;
    }

    const { id, title, image, participants } = openRoom;

    return {
      participants,
      id,
      title,
      photo: image,
      myId: myData?.id,
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
