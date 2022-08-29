import Image from 'next/image';
import React from 'react';
import { updateRoomAva } from '../../../store/actions/room';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { GetGroupChatInfo } from '../../../store/selectors';
import { Avatar } from '../../avatar';
import { AvatarInput } from '../../avatar/input';
import logout_icon from '../../../images/logout.svg';
import { StyledSearchUserItem, StyledUsers } from '../../createRoom/styled';
import { StyledIconButton } from '../../../styles';
import { TitleInput } from './titleInput';

const VALID_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

export const GroupInfo = () => {
  const dispatch = useAppDispatch();

  const roomInfo = useAppSelector(GetGroupChatInfo);

  if (!roomInfo) {
    return null;
  }

  const { myId, participants, photo, title } = roomInfo;

  const onSelectFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0 || !VALID_TYPES.includes(target.files[0].type)) {
      return;
    }

    dispatch(updateRoomAva(target.files[0]));
  };

  return (
    <>
      <div className='group_form'>
        <AvatarInput name={title as string} size={120} photo={photo} onChange={onSelectFile} />
        <TitleInput title={title as string}/>
      </div>
      <StyledUsers padding={0}>
        {participants.map(({ name, photo, online, id }) => (
          <StyledSearchUserItem className='user_wrapper' key={id}>
            <div className='data_wrapper'>
              <Avatar size={45} photo={photo} name={name} online={online} />
              <p className='bold'>{name}</p>
            </div>
            {id === myId && (
              <StyledIconButton title='Leave Group'>
                <Image width='32px' height='32px' src={logout_icon} alt='add_dialog' />
              </StyledIconButton>
            )}
            {/* <MyCheckbox checked={checked} /> */}
          </StyledSearchUserItem>
        ))}
      </StyledUsers>
    </>
  );
};
