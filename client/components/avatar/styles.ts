import styled from 'styled-components';

export const AvaWrapper = styled.div<{ size: number }>`
  position: relative;
`;

export const StyledAva = styled.div<{ backgroundImage?: string | null; size: number }>`
  width: ${({ size }) => `${size}px`};
  min-width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  min-height: ${({ size }) => `${size}px`};
  background-color: #e0e0e0;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: ${({ size }) => `${Math.floor(size/40)}rem`};
  color: #494949;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})` || ''};
  background-size: cover;
  position: relative;

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
  background-color: #58d188;
  border-radius: 100%;
  border: 2px solid white;
  position: absolute;
  right: 0;
  bottom: 0;
`;
