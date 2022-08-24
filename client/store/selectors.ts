import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '.';
import { returnTypingText } from '../utils/message';

export const selectRooms = (state: RootState) => state.rooms;
export const selectMessages = (state: RootState) => state.messages;
export const selectMyData = (state: RootState) => state.user.data;
export const selectCreatingRoom = (state: RootState) => state.createRoom;

export const getSelectedRoom = (state: RootState) =>
  state.rooms.data.find(({ id }) => id === state.rooms.selected);

export const getChatData = createSelector(
  selectRooms,
  selectMessages,
  selectMyData,
  ({ data, selected }, { typing, data: messages }, myData) => {
    const openRoom = data.find(({ id }) => id === selected);
    const typingInChat = selected ? typing[selected] : [];

    const typingText = returnTypingText(typingInChat, openRoom?.type);

    return {
      selected: openRoom,
      typingText,
      messages,
      myId: myData?.id,
    };
  }
);

export const getRoomsInfo = createSelector(
  selectRooms,
  selectMessages,
  selectMyData,
  selectCreatingRoom,
  ({ data, selected }, { typing }, myData, { open }) => {
    return {
      typing,
      rooms: data,
      me: myData,
      selected,
      isCreatRoomOpen: open
    };
  }
);
