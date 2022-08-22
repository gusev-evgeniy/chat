import styled from 'styled-components';
import { StyledInputIcon, StyledTextInput } from '../../styles';
import { COLORS } from '../../styles/variables';

export const StyledRooms = styled.div`
  height: 100vh;
  width: 30%;
  border-right: 1px solid #e3e3e3;
  position: relative;

  .header {
    padding: 10px 12px;
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

  .rooms_wrapper {
    height: calc(100% - 140px);
    overflow: auto;
    flex: 1;
  }

  .footer {
    position: absolute;
    display: flex;
    bottom: 0;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
    padding: 10px 15px;
    background-color: #ededed;
    border-radius: 30px;
    width: 60%;

    p {
      margin-left: 20%;
      font-weight: 700;
      font-size: 1.2rem;
    }
  }
`;

export const StyledRoom = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 13px 15px;
  cursor: pointer;
  background-color: ${({ selected }) => selected && 'rgba(227, 227, 227, 0.7)'};

  .data {
    margin-left: 10px;
    width: calc(100% - 60px);

    .info {
      display: flex;
      margin-bottom: 3px;
      justify-content: space-between;

      .time {
        font-size: 0.9rem;
        font-weight: 300;
      }
    }

    .messages {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 5px;
      font-size: 1.1rem;
      font-weight: 400;

      .message {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

      }
      .typing {
        color: ${COLORS.BLUE};
        font-weight: 600;
      }

      .count {
        background-color: ${COLORS.BLUE};
        padding: 3px;
        font-size: 0.9rem;
        font-weight: 300;
        color: white;
        border-radius: 8px;
      }
    }
  }

  &:hover {
    background-color: ${({ selected }) => !selected && 'rgba(227, 227, 227, 0.3)'};
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
