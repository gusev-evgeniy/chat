import styled from 'styled-components';

import { BOX_SHADOW, COLORS } from '@/styles/variables';

export const baseRadius = `20px`;
export const sign_in_padding = `18px`;

export const StyledWrapper = styled.div<{ padding?: string }>`
  background-color: #fff;
  border-radius: ${baseRadius};
  border: 1px solid #e8e3d7;
  box-shadow: ${BOX_SHADOW};
  max-width: 550px;
  min-width: 320px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: ${({ padding }) => padding && `${padding}`};
  position: relative;

  h3 {
    margin-bottom: 35px;
    font-weight: 700;
  }

  & .sign_in {
    font-size: 15px;
    font-weight: 700;
    margin-top: ${sign_in_padding};
    color: #4f6fa5;
    cursor: pointer;
  }

  & .choose_photo {
    font-size: 16px;
    font-weight: 400;
    color: #5677ad;
  }

  & .hello_letter {
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    padding-bottom: 30px;
  }

  & .user_data {
    margin-bottom: 30px;
    align-items: center;
    text-align: center;
    display: flex;
    flex-direction: column;

    p {
      margin-top: 10px;
    }
  }

  & .private_policy {
    margin-top: 10px;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #817f7a;
  }
`;

export const AuthInput = styled.input<{ margin?: string }>`
  width: 290px;
  padding: 10px;
  text-align: center;
  font-weight: 400;
  font-size: 26px;
  border: 1px solid #e3e3e3;
  border-radius: 20px;
  margin: ${({ margin }) => margin ? margin : null} ;

  :focus {
    outline: 1px solid #dad6ca;
  }
`;

export const StyledButton = styled.button<{ width: string; height: string }>`
  background-color: #5677ad;
  border-radius: 30px;
  border: 0;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  text-align: center;
  width: ${props => props.width};
  height: ${props => props.height};

  :hover {
    background-color: #4e6d9f;
  }

  :disabled {
    background-color: #dad6ca;
  }

  & .arrow {
    margin-left: 10px;
  }
`;

export const StyledAdvises = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;

  p {
    font-size: 1.4rem;
  }

  span {
    margin-top: 3px;
  }
`;

export const StyledSubButton = styled.button`
  font-size: 15px;
  font-weight: 700;
  color: ${COLORS.BLUE};
  background-color: inherit;
  border: none;
  margin-top: 18px;
  cursor: pointer;
`;

export const AlertMessage = styled.p`
  font-weight: 600;
  color: #ea0027;
  transition: all 0.2s ease-in-out;
  margin-top: 30px;
  font-size: 1.4rem;
`;

export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 350px;
  position: relative;
`;

export const BackButon = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
`;
