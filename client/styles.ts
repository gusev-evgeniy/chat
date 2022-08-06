import styled from 'styled-components';
import { StyledWrapper } from './components/auth/styles';

export const DISABLED_GRAY = '#dad6ca';

export const MainWrapper = styled(StyledWrapper)`
  min-width: 80%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
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

  :focus, :active {
    outline: 1px solid ${DISABLED_GRAY};
  }
`;