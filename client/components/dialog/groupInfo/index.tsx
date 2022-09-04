import React from 'react';
import Image from 'next/image';

import { socket } from '../../../api/socket';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { GetGroupChatInfo } from '../../../store/selectors';
import { StyledIconButton } from '../../../styles';
import { EVENTS } from '../../../utils/constants';
import { Avatar } from '../../avatar';
import { AvatarInput } from '../../avatar/input';
import { StyledSearchUserItem, StyledUsers } from '../../createRoom/styled';
import { TitleInput } from './titleInput';

import logout_icon from '../../../images/logout.svg';
import { deleteRoom } from '../../../store/slices/rooms';
import { openDialog } from '../../../store/slices/dialog';
import { DialogWrapper } from '../wrapper';

const VALID_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

export const GroupInfo = () => {
  const dispatch = useAppDispatch();

  const roomInfo = useAppSelector(GetGroupChatInfo);

  if (!roomInfo) {
    return null;
  }

  const { participants, photo, title, id, myId } = roomInfo;

  const onSelectFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0 || !VALID_TYPES.includes(target.files[0].type)) {
      return;
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
          <AvatarInput name={title as string} size={120} photo={photo} onChange={onSelectFile} />
          <TitleInput title={title as string} update={updateGroup} />
        </div>
        <StyledUsers padding={0}>
          {participants.map(({ name, photo, online, id }) => (
            <StyledSearchUserItem className='user_wrapper' key={id}>
              <div className='data_wrapper'>
                <Avatar size={45} photo={photo} name={name} online={online} />
                <p className='bold'>{name}</p>
              </div>
              {id === myId && (
                <StyledIconButton title='Leave Group' onClick={onLeave}>
                  <Image width='32px' height='32px' src={logout_icon} alt='add_dialog' />
                </StyledIconButton>
              )}
            </StyledSearchUserItem>
          ))}
        </StyledUsers>
      </>
    </DialogWrapper>
  );
};
