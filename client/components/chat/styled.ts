import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { COLORS, WIDTH } from '../../styles/variables';

export const StyledChat = styled.div<{ empty?: boolean }>`
  height: ${({ empty }) => (empty ? 'null' : '100%')};
  width: 70%;
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

  @media screen and (max-width: ${WIDTH.MEDIUM}) {
    width: 100%;
  } 
`;

export const StyledChatHeader = styled.div`
  height: 65px;
  border-bottom: 1px solid #e3e3e3;
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  background-color: #fff;

  .title {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .online {
    color: ${COLORS.BLUE};
    font-weight: 600;
    font-size: 1rem;
  }
`;

export const StyledChatItem = styled.div<{ my?: boolean; isLast?: boolean }>`
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
    max-width: 80%;

    .message {
      word-break: break-all;
      white-space: pre-line;
      font-size: 1.1rem;
    }
  }

  .time {
    font-size: 11px;
    opacity: 0.9;
    margin-left: 8px;
  }

  .readed_icon {
    display: flex;
    align-items: flex-end;
    min-width: 18px;
    margin-left: 4px;
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

export const StyledInputButton = styled.button`
  position: absolute;
  right: 12px;
  background-color: inherit;
  display: flex;
  padding: 2px;
  border: 0px;
`;

export const StyledInputSearchButton = styled(StyledInputButton)`
  top: 46%;
  transform: translateY(-50%);
`;

export const StyledSubmitIcon = styled(StyledInputButton)`
  bottom: 11px;
`;

export const StyledSystemMessage = styled.div`
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 20px;
  background-color: #ededee;
  max-width: 80%;
  margin: 0 auto 15px auto;
  font-size: 1.2rem;
`;

export const StyledSubstring = styled.p`
  font-size: 1rem;
  opacity: 0.5;
`;

export const StyledGroupSubstring = styled(StyledSubstring)`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
