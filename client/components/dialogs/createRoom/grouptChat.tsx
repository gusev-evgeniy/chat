import React from 'react';

import { StyledButton } from 'components/auth/styles';
import { AvatarInput } from 'components/avatar/input';
import { DialogWrapper } from 'components/dialogs/wrapper';
import { useNewRoom } from './search/useNewRoom';

import { GroupChatForm, StyledGroupNameIntput } from './styles';
import { IMG_TYPES_TEXT_ERROR, VALID_IMG_TYPES } from 'utils/constants';
import { useAppDispatch } from 'store/hooks';
import { setError } from 'store/slices/error';

const MAX_LENGTH = 20;

export const GrouptChat = () => {
  const dispatch = useAppDispatch();

  const {
    onChangeName,
    createRoomHandler,
    setPhoto,
    title,
    preview,
    background,
  } = useNewRoom();

  const onSelectFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    if (!VALID_IMG_TYPES.includes(target.files[0].type)) {
      dispatch(setError(IMG_TYPES_TEXT_ERROR));
      return setPhoto(null);
    }

    setPhoto(target.files[0]);
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
            gradient={background}
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
              height='43px'
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
