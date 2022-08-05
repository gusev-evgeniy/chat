import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { StyledInputIcon } from '../../styles';

export const StyledChat = styled.div`
  height: 100vh;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledChatItem = styled.div<{ my: boolean }>`
  width: 100%;
  display: flex;
  position: relative;

  .item {
    width: fit-content;
    position: relative;
    display: flex;
    font-weight: 400;
    padding: 5px;
    border-radius: 5px;
    background-color: ${({ my }) => (my ? '#ededee' : '#58d188')};
    justify-content: flex-start;
  }

  .time {
    font-size: 11px;
    opacity: 0.5;
  }
`;

export const StyledMessageForm = styled.form`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: red;
  font-size: 0;
  border-top: 1px solid #E3E3E3; 
`;

export const StyledTextareaAutosize = styled(TextareaAutosize)`
  resize: none;
  font-size: 20px;
  font-weight: 500;
  color: #1c1c1c;
  width: 100%;
  border: none;
  outline: none;
  min-height: 57px;
  padding: 15px 15px 15px 40px;

  ::-webkit-scrollbar {
    display: none;
  }

  :focus {
    border-color: black;
  }
`;

export const StyledSubmitIcon = styled(StyledInputIcon)`
  bottom: 0;
`;
