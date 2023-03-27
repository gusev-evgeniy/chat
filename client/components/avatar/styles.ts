import styled from 'styled-components';

import { COLORS } from 'styles/variables';

export const AvaWrapper = styled.div<{ size: number }>`
  position: relative;
  background-color: rgba(238,238,238,0.5);
  
`;

export const StyledAva = styled.div<{ backgroundImage?: string | null; size: number, gradient: string }>`
  width: ${({ size }) => `${size}px`};
  min-width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  min-height: ${({ size }) => `${size}px`};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: ${({ size }) => `${Math.floor(size / 40)}rem`};
  color: #494949;
  position: relative;
  overflow: hidden;
  background-image: ${({ backgroundImage, gradient }) => backgroundImage ?  `url(${backgroundImage})` : gradient};
  background-size: cover;
  position: relative;
  border:  1px solid #e3e3e3;
  /* background: ${({ gradient }) => gradient}; */
  color: white;
  text-shadow: 0 0 1px black;

  .upload {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: none;

    input {
      display: none;
    }
  }
`;

export const StyledChangeAva = styled(StyledAva)`
  :hover {
    .upload {
      display: flex;
    }

    span {
      display: none;
    }
  }
`;

export const Online = styled.div`
  width: 13px;
  height: 13px;
  background-color: ${COLORS.GREEN};
  border-radius: 100%;
  border: 2px solid white;
  position: absolute;
  right: 0;
  bottom: 0;
`;
