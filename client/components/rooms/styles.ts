import styled from 'styled-components';

import { StyledInputIcon, StyledTextInput } from 'styles';
import { COLORS } from 'styles/variables';

export const StyledRooms = styled.div<{ fullWidth: boolean }>`
  height: 100vh;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '30%')};
  border-right: ${({ fullWidth }) => !fullWidth && '1px solid #e3e3e3'};
  min-width: 300px;
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
        background-color: ${COLORS.OPACITY_GRAY};
      }
    }

    form {
      position: relative;
      width: 100%;
      margin-right: 15px;
    }
  }

  .rooms_wrapper {
    min-height: calc(100% - 124px);
    max-height: calc(100% - 124px);
    overflow: auto;
    flex: 1;
  }

  .footer {
    display: flex;
    align-items: center;
    padding: 13px;
    background-color: inherit;
    width: 100%;
    justify-content: space-between;
    height: 57px;
    border-top: 1px solid #e3e3e3;

    .user_info {
      display: flex;
      align-items: center;

      p {
        font-weight: 700;
        font-size: 1.1rem;
        margin-left: 15px;
      }
    }

    .image_wrapper {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
`;

export const StyledRoom = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 13px 15px;
  cursor: pointer;
  background-color: ${({ selected }) => selected && COLORS.OPACITY_GRAY};

  .data {
    margin-left: 10px;
    width: calc(100% - 60px);

    .info {
      display: flex;
      margin-bottom: 3px;
      justify-content: space-between;

      .name {
        overflow: hidden;
        text-overflow: ellipsis;
      }

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
    background-color: ${({ selected }) =>
      !selected && 'rgba(227, 227, 227, 0.3)'};
  }
`;

export const StyledLastMessage = styled.p<{ unreaded: boolean }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ unreaded }) => unreaded && COLORS.BLUE};
  font-weight: ${({ unreaded }) => unreaded && 600};
`;

export const StyledSearchIcon = styled(StyledInputIcon)`
  top: 50%;
`;

export const StyledSearchInput = styled(StyledTextInput)`
  width: 100%;
  padding: 6px 45px 6px 15px;
  text-overflow: ellipsis;
  font-size: 20px;
  background-color: ${COLORS.INPUT_BG}; ;
`;

export const StyledWarning = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  text-align: center;
  border-bottom: 1px solid #e3e3e3;
  background-color: ${COLORS.INPUT_BG};
  justify-content: center;
  font-size: 1rem;
  color: #7c7c7c;
`;
