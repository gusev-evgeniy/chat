import styled from 'styled-components';
import { StyledTextInput } from '../../styles';
import { StyledWrapper } from '../auth/styles';

export const StyledLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 12px;
  color: #7c7c7c;
  margin-bottom: 15px;
  margin-left: 15px;
  text-transform: uppercase;
`;

export const StyledCreateRoom = styled.div`
  background-color: #f6f7f8;
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  .group_name {
    width: 100%;
    max-width: 700px;
    margin: 100px auto 100px auto;
  }

  form {
    display: flex;
    flex-direction: column;

    .input_wrapper {
      position: relative;

      .count {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1rem;
        color: #7c7c7c;
        font-weight: 600;
      }
    }
  }
`;

export const StyledGroupNameIntput = styled(StyledTextInput)`
  width: 100%;
  padding: 10px 60px 10px 15px;
  font-size: 1.5rem;
  text-overflow: ellipsis;
`;

export const StyledFindUserIntput = styled(StyledGroupNameIntput)`
  background-color: #F6F7F8;
`;

export const StyledSearchUserWrapper = styled(StyledWrapper)`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background-color: #fff;

  form {
    width: inherit;
  }
`;

export const StyledUsers = styled(StyledWrapper)`
  width: inherit;
  max-height: 440px;
  overflow: auto;
  margin-top: 25px;
  max-width: 100%;

  .user_wrapper:not(:first-child) {
    border-top: 1px solid #e3e3e3;
  }
`;

export const StyledSearchUserItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 18px;
  align-items: center;
  cursor: pointer;

  .data_wrapper {
    display: flex;
    align-items: center;

    p {
      margin-left: 15px;
      font-size: 1.3rem;
    }
  }
`;
