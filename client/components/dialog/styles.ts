import styled from 'styled-components';
import { COLORS } from '../../styles/variables';
import { StyledWrapper } from '../auth/styles';
import { StyledInputButton } from '../chat/styled';

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

export const StyledContainer = styled(StyledWrapper)`
  position: relative;
  width: 60%;
  max-width: 600px;

  .group_title {
    margin: 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 600;

    form {
      width: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      input {
        font-size: 1.5rem;
        font-weight: 600;
        border: none;
        outline: none;
        text-align: center;
      }
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
