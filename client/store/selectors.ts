import { createSelector } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { RootState } from '.';
import { NEW_ROOM } from '../utils/constants';
import { returnTypingText } from '../utils/message';

export const selectRooms = (state: RootState) => state.rooms;
export const selectMessages = (state: RootState) => state.messages;
export const selectMyData = (state: RootState) => state.user.data;
export const selectCreatingRoom = (state: RootState) => state.createRoom;
export const selectCreatingRoomOpen = (state: RootState) => state.createRoom.open;

export const getChatData = createSelector(
  selectRooms,
  selectMessages,
  ({ data, selected }, { typing, data: messages }) => {
    const openRoom = data.find(({ id }) => id === selected);
    const typingInChat = selected ? typing[selected] : [];

    const typingText = returnTypingText(typingInChat, openRoom?.type);

    return {
      typingText,
      messages,
      selected,
      unreadedMessagesCount: openRoom?.unreadedMessagesCount
    };
  }
);

export const getRoomsInfo = createSelector(
  selectRooms,
  selectMessages,
  selectMyData,
  selectCreatingRoomOpen,
  ({ data, selected }, { typing }, myData, open) => {
    return {
      typing,
      rooms: data,
      me: myData,
      selected,
      isCreatRoomOpen: open
    };
  }
);

export const getHeaderInfo = createSelector(
  selectRooms,
  selectMyData,
  selectCreatingRoom,
  ({ selected, data }, myData, { checked, type  }) => {
    const isNewRoom = selected === NEW_ROOM;

    const selectedRoom = isNewRoom ? { type, participants: checked, title: undefined } : data.find(({ id }) => id === selected);

    if (!selectedRoom) {
      return undefined;
    }

    const { participants, type: selectedRoomType, title: selectedRoomTitle } = selectedRoom;

    const privateUser = selectedRoomType === 'private' 
      ? participants.find(participant => participant.id !== myData?.id) 
      : undefined;

    const online = privateUser?.online;
    const substring = privateUser 
      ? dayjs(privateUser.wasOnline).format('YYYY-MM-DD') 
      : `${participants.length} участников, ${participants.filter(({ online }) => online).length} в сети`;

    const title = privateUser?.name || selectedRoomTitle;

    return {
      isNewRoom,
      online,
      substring,
      title
    }
  }
)