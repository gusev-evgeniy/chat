import styled from 'styled-components';

import { StyledWrapper } from 'components/auth/styles';

import { StyledForm, StyledTextInput } from 'styles';
import { COLORS, WIDTH } from 'styles/variables';

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
  width: 70%;
  display: flex;
  flex-direction: column;

  .container {
    padding: 0 20px;
  }

  .group_name {
    width: 100%;
    max-width: 700px;
    margin: 10vh auto;
    min-height: 81px;
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

  .buttons {
    margin-top: 50px;
    width: inherit;
    display: flex;
  }

  @media screen and (max-width: ${WIDTH.MEDIUM}) {
    width: 100%;
  }
`;

export const StyledGroupNameIntput = styled(StyledTextInput)`
  width: 100%;
  padding: 10px 60px 10px 15px;
  font-size: 1.5rem;
  text-overflow: ellipsis;
`;

export const StyledFindUserIntput = styled(StyledGroupNameIntput)`
  background-color: #f6f7f8;
`;

export const StyledSearchUserWrapper = styled.div`
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    width: inherit;

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

  .buttons {
    width: inherit;
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  .checked_list {
    min-height: 40px;
    display: flex;
    width: inherit;
    overflow: hidden;
    flex-wrap: wrap;
    justify-content: center;
    margin: 12px 0;
  }
`;

export const StyledUsers = styled(StyledWrapper)`
  width: 100%;
  margin-bottom: 15px;
  padding: 15px 0;

  .users_container {
    width: inherit;
    max-height: 400px;
    overflow: auto;
    border-bottom: 1px solid #e3e3e3;
    border-top: 1px solid #e3e3e3;

    .user_wrapper {
      &:not(:first-child) {
        border-top: 1px solid #e3e3e3;
      }
    }
  }
`;

export const StyledCheckedItem = styled.div`
  padding: 10px 15px;
  border-radius: 100px;
  background-color: ${COLORS.GREY};
  align-items: center;
  display: flex;
  cursor: pointer;
  font-size: 1.2rem;
  margin: 3px;
  height: 40px;

  .name {
    margin-right: 10px;
  }

  :hover {
    background-color: #e5e5e5;
  }
`;

export const GroupChatForm = styled(StyledForm)`
  .input_wrapper {
    position: relative;
    margin: 40px 0;

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
`;
