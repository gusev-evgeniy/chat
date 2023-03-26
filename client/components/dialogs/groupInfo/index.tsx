import React from 'react';

import { socket } from 'api/socket';

import { deleteRoom } from 'store/slices/rooms';
import { openDialog } from 'store/slices/dialog';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { GetGroupChatInfo } from 'store/selectors';

import { EVENTS, IMG_TYPES_TEXT_ERROR, VALID_IMG_TYPES } from 'utils/constants';

import { AvatarInput } from 'components/avatar/input';
import { StyledUsers } from 'components/dialogs/createRoom/styles';
import { TitleInput } from './titleInput';
import { DialogWrapper } from '../wrapper';
import { Participant } from './participant';
import { setError } from 'store/slices/error';

export const GroupInfo = () => {
  const dispatch = useAppDispatch();

  const roomInfo = useAppSelector(GetGroupChatInfo);

  if (!roomInfo) {
    return null;
  }

  const { participants, photo, title, id, myId } = roomInfo;

  const onSelectFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !target.files ||
      target.files.length === 0 ||
      !VALID_IMG_TYPES.includes(target.files[0].type)
    ) {
      return dispatch(setError(IMG_TYPES_TEXT_ERROR));
    }

    updateGroup({ photo: target.files[0] });
  };

  const updateGroup = (data: { photo?: File; title?: string }) => {
    socket.emit(EVENTS.ROOM.UPDATE, { ...data, id });
  };

  const onLeave = () => {
    socket.emit(EVENTS.ROOM.LEAVE, { roomId: id }, () => {
      dispatch(deleteRoom(id));
      dispatch(openDialog(null));
    });
  };

  return (
    <DialogWrapper>
      <>
        <div className='group_form'>
          <AvatarInput
            name={title as string}
            size={120}
            photo={photo}
            onChange={onSelectFile}
          />
          <TitleInput title={title as string} update={updateGroup} />
        </div>
        <StyledUsers>
          {participants.map(user => (
            <Participant
              key={user.id}
              {...user}
              onLeave={onLeave}
              myId={myId}
            />
          ))}
        </StyledUsers>
      </>
    </DialogWrapper>
  );
};
