import styled from 'styled-components';
import { COLORS } from 'styles/variables';
import { StyledWrapper } from '../auth/styles';

export const StyledSideMenuWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const StyledSideMenu = styled(StyledWrapper)`
  overflow: hidden;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export const StyledSideMenuIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-radius: 100%;
  cursor: pointer;

  :hover {
    background-color: ${COLORS.OPACITY_GRAY};
  }
`;

export const StyledAbsoluteSideMenuIcon = styled(StyledSideMenuIcon)`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-radius: 100%;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;

  :hover {
    background-color: ${COLORS.OPACITY_GRAY};
  }
`;

