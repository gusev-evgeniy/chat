import styled from 'styled-components';
import { StyledWrapper } from '../components/auth/styles';
import { StyledInputButton } from '../components/chat/styled';
import { COLORS } from './variables';

export const DISABLED_GRAY = '#dad6ca';

export const MainWrapper = styled(StyledWrapper)`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  max-width: 1280px;
`;

export const StyledInputIcon = styled.div`
  position: absolute;
  right: 12px;
  transform: translateY(-50%);
`;

export const StyledTextInput = styled.input`
  text-align: center;
  font-weight: 400;
  border: 1px solid #e3e3e3;
  border-radius: 20px;

  :focus,
  :active {
    outline: 1px solid ${DISABLED_GRAY};
  }
`;

export const Empty = styled.div<{ margin?: string }>`
  margin: ${({ margin }) => (margin ? `${margin} auto` : `50% auto`)};
  transform: ${({ margin }) => !margin && `translateY(-50%)`};
  font-size: 1.2rem;
  color: #7c7c7c;
  text-align: center;
`;

export const StyledIconButton = styled.button`
  padding: 3px;
  border-radius: 100%;
  background-color: inherit;
  display: flex;
  border: 0px;

  &:hover {
    background-color: ${COLORS.GREY}
  }
`;
