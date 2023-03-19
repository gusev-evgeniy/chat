import { StyledButton } from 'components/auth/styles';
import { AvatarInput } from 'components/avatar/input';
import { DialogWrapper } from 'components/dialog/wrapper';
import { useAvatartPreview } from 'hooks/useAvatartPreview';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCreatingRoom } from 'store/selectors';
import { changeAva } from 'store/slices/createRoom';
import { useNewRoom } from './search/useNewRoom';
import { GroupChatForm, StyledGroupNameIntput } from './styles';

const VALID_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
const MAX_LENGTH = 20;

export const GrouptChat = () => {
  const dispatch = useAppDispatch();

  const { onChangeName, createRoomHandler } = useNewRoom();

  const { title, ava } = useAppSelector(selectCreatingRoom);

  const { preview } = useAvatartPreview(ava);

  const onSelectFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    if (!VALID_TYPES.includes(target.files[0].type)) {
      dispatch(changeAva(null));
      return;
    }

    dispatch(changeAva(target.files[0]));
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
