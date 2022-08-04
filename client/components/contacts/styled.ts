import styled from 'styled-components';

export const StyledContacts = styled.div`
  height: 100vh;
  width: 25%;
  border-right: 1px solid #e3e3e3;

  .header {
    padding: 20px;
    border-bottom: 1px solid #e3e3e3;

    form {
      position: relative;

      .search_icon {
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translateY(-50%);
      }
    }

    .search {
      width: 100%;
      padding: 7px 45px 7px 15px;
      text-overflow:ellipsis;
      text-align: center;
      font-weight: 400;
      font-size: 26px;
      border: 1px solid #e3e3e3;
      border-radius: 20px;

      :focus {
        outline: 1px solid #dad6ca;
      }
    }
  }
`;

export const StyledContactItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;

  .data {
    margin-left: 20px;
    width: calc(100% - 70px);

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
    background-color: #ccc;
  }
`;
