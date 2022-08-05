import styled from 'styled-components';
import { StyledInputIcon } from '../../styles';

export const StyledContacts = styled.div`
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
      
      .search {
        width: 100%;
        padding: 6px 45px 6px 15px;
        text-overflow: ellipsis;
        text-align: center;
        font-weight: 400;
        font-size: 20px;
        border: 1px solid #e3e3e3;
        border-radius: 20px;

        :focus {
          outline: 1px solid #dad6ca;
        }
      }
    }
  }
`;

export const StyledContactItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 10px;
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