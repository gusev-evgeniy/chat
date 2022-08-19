import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { StyledInputIcon } from '../../styles';
import { COLORS } from '../../styles/variables';

export const StyledChat = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .messages_wrapper {
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
    height: inherit;
  }

  .messages {
    height: inherit;
    width: inherit;
    /* overflow-y: auto; */
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .day {
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }

    .typing {
      min-height: 25px;
      width: fit-content;
      min-width: 80px;
      margin: 0 auto;
      text-align: center;
      font-weight: 600;
      color: ${COLORS.BLUE};
    }
  }

  .header {
    height: 71px;
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

export const StyledChatItem = styled.div<{ my: boolean; isLast?: boolean }>`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: flex-end;
  margin-bottom: 3px;
  flex-direction: ${({ my }) => (my ? 'row' : 'row-reverse')};
  align-items: flex-end;

  .item {
    width: fit-content;
    position: relative;
    display: flex;
    font-weight: 400;
    padding: 5px 15px;
    border-radius: 20px;
    background-color: ${({ my }) => (my ? '#ededee' : '#58d188')};
    align-items: flex-end;
    margin-left: ${({ isLast }) => (!isLast ? '44px' : '8px')};
    margin-right: ${({ isLast }) => (!isLast ? '44px' : '8px')};
    max-width: 70%;

    .message {
      word-break: break-all;
      white-space: pre-line;
      font-size: 1.1rem;
    }
  }

  .time {
    font-size: 11px;
    opacity: 0.5;
    margin-left: 8px;
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
  padding: 15px 50px 15px 15px;

  ::-webkit-scrollbar {
    display: none;
  }

  :focus {
    border-color: black;
  }
`;

export const StyledSubmitIcon = styled.button`
  bottom: 11px;
  position: absolute;
  right: 12px;
  background-color: inherit;
  border-radius: 100%;
  display: flex;
  padding: 2px;
  border: 0px;

  :hover {
    background-color: rgba(227, 227, 227, 0.7);
  }
`;
