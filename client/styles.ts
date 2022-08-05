import styled from 'styled-components';
import { StyledWrapper } from './components/auth/styles';

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