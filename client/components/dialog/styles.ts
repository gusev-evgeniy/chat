import styled from 'styled-components';

import { SyledDefaultIconButton } from 'styles';
import { COLORS } from 'styles/variables';
import { StyledWrapper } from 'components/auth/styles';
import { StyledInputButton } from 'components/chat/styles';

export const StyledVeil = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  .header {
    width: 100%;
    position: relative;
    height: 20px;
  }
`;

export const StyledContainer = styled(StyledWrapper)<{width?: string}>`
  position: relative;
  width: ${({ width }) => width ? width : '60%'};
  max-width: 600px;

  .group_form {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .group_title {
    margin: 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 600;

    input {
      font-size: 1.5rem;
      font-weight: 600;
      border: none;
      outline: none;
      text-align: center;
    }
  }
`;

export const CloseIconWrapper = styled(StyledInputButton)`
  border: 100%;
  right: -15px;
  top: -15px;
  border-radius: 100%;

  &:hover {
    background-color: ${COLORS.GREY};
  }
`;

export const CallButtons = styled.div`
  display: flex;
  width: 100%;
  margin: 30px 0 10px 0; 
  justify-content: center;
  cursor: pointer;
`

export const CallButton = styled(SyledDefaultIconButton)<{acceptBtn?: boolean}>`
  padding: 10px;
  background-color:${({ acceptBtn }) => acceptBtn ? COLORS.GREEN : COLORS.RED};
  margin: 0 10px;

  &:hover {
    transform: scale(1.1)
  }
`

export const CallUser = styled.div`
  text-align: center;
  align-items: center;

  .header {
    margin-bottom: 40px;
    font-weight: bolder;
    font-size: 1.4rem;
  }

  .name {
    margin-top: 10px;
    font-size:  1.4rem;
  }
`

export const VidoeContainer = styled.div`
   width: 100%;
   position: relative;

   .avatar {
    z-index: 1;
    position: absolute;
    right: 10px;
    top: 10px;
    opacity: 0.7;
   }

`

export const CompanionVideo = styled.video`
  width: 100%;
`

export const MyVideo = styled.video`
  position: absolute;
  width: 25%;
  left: 0;
`