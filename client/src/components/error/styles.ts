import styled from 'styled-components';

export const StyledErrorWrapper = styled.div`
  max-width: 430px;
  max-height: 200px;
  overflow: hidden;
  padding: 12px 48px 12px 12px;
  z-index: 99;
  position: relative;
  background-color: #f44336;
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  opacity: 0.9;
  border-radius: 10px;
  color: #fff;

  .closeButton {
    position: absolute;
    top: 14px;
    right: 12px;
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
  }

`;
