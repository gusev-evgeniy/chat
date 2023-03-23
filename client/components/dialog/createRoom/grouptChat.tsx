import React from 'react';

import { StyledButton } from 'components/auth/styles';
import { AvatarInput } from 'components/avatar/input';
import { DialogWrapper } from 'components/dialog/wrapper';
import { useNewRoom } from './search/useNewRoom';

import { GroupChatForm, StyledGroupNameIntput } from './styles';

const VALID_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
const MAX_LENGTH = 20;

export const GrouptChat = () => {
  const { onChangeName, createRoomHandler, setPhoto, title, preview } = useNewRoom();

  const onSelectFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    if (!VALID_TYPES.includes(target.files[0].type)) {
      return setPhoto(null);
    }

    setPhoto(target.files[0])
  };

  const groupNameLength = title.length;

  return (
    <DialogWrapper width='25%'>
      <>
        <GroupChatForm>
          <AvatarInput
            name={title}
            onChange={onSelectFile}
            photo={preview}
            size={100}
          />

          <div className='input_wrapper'>
            <StyledGroupNameIntput
              type='text'
              className='search'
              placeholder='Type here'
              value={title}
              onChange={onChangeName}
            />
            <div className='count'>
              {groupNameLength}/{MAX_LENGTH}
            </div>
          </div>

          <div className='buttons'>
            <StyledButton
              width='160px'
              height='48px'
              disabled={groupNameLength === 0}
              onClick={createRoomHandler}>
              Create Room
            </StyledButton>
          </div>
        </GroupChatForm>
      </>
    </DialogWrapper>
  );
};
