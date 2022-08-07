import styled from 'styled-components';
import { StyledInputIcon, StyledTextInput } from '../../styles';

export const StyledDialogs = styled.div`
  height: 100vh;
  width: 30%;
  border-right: 1px solid #e3e3e3;

  .header {
    padding: 12px;
    border-bottom: 1px solid #e3e3e3;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .add_chat {
      cursor: pointer;
      min-height: 45px;
      min-width: 45px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      :hover {
        background-color: rgba(227, 227, 227, 0.7);
      }
    }

    form {
      position: relative;
      width: 100%;
      margin-right: 15px;
    }

  }
  
  .dialogs_wrapper {
    height: calc(100% - 70px);
    overflow: auto;
  }
`;

export const StyledDialogItem = styled.div`
  display: flex;
  align-items: center;
  padding: 13px 15px;
  cursor: pointer;

  .data {
    margin-left: 10px;
    width: calc(100% - 60px);

    .info {
      display: flex;
      margin-bottom: 3px;
      justify-content: space-between;

      .time {
        font-size: 15px;
        font-weight: 300;
      }
    }

    .last_message {
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &:hover {
    background-color: rgba(227, 227, 227, 0.7);
  }
`;

export const StyledSearchIcon = styled(StyledInputIcon)`
  top: 50%;
`;

export const StyledSearchInput = styled(StyledTextInput)`
  width: 100%;
  padding: 6px 45px 6px 15px;
  text-overflow: ellipsis;
  font-size: 20px;
`;
