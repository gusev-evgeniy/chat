import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { StyledInputIcon } from '../../styles';

export const StyledChat = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .messages {
    height: 100%;
    width: 100%;
    padding: 10px;
  }

  .header {
    height: 66px;
    border-bottom: 1px solid #e3e3e3;
    padding: 12px;
    display: flex;
    align-items: center;

    .arrow {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      border-radius: 100%;
      cursor: pointer;

      :hover {
        background-color: rgba(227, 227, 227, 0.7);
      }
    }

    .title {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .time {
      font-size: 1rem;
      opacity: 0.5;
      margin: 0 3px;
    }
  }
`;

export const StyledChatItem = styled.div<{ my: boolean }>`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: ${({ my }) => (my ? 'flex-end' : 'flex-start')};
  margin-bottom: 3px;

  .item {
    width: fit-content;
    position: relative;
    display: flex;
    font-weight: 400;
    padding: 5px 15px;
    border-radius: 20px;
    background-color: ${({ my }) => (my ? '#ededee' : '#58d188')};
    align-items: flex-end;
  }

  .time {
    font-size: 11px;
    opacity: 0.5;
    margin: 0 3px;
  }

  .readed_icon {
    display: flex;
    align-items: flex-end;
  }
`;

export const StyledMessageForm = styled.form`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: red;
  font-size: 0;
  border-top: 1px solid #e3e3e3;
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
