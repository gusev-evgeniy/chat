import styled from 'styled-components';
export const baseRadius = `20px`;
export const padding = `18px`;

export const StyledWrapper = styled.div<{ padding: number }>`
  background-color: #fff;
  border-radius: ${baseRadius};
  border: 1px solid #e8e3d7;
  box-shadow: 0px 2px 10px 0px rgba(31, 29, 29, 0.05);
  max-width: 500px;
  min-width: 320px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: ${props => props.padding}px;

  h3 {
    margin-bottom: 35px;
    font-weight: 700;
  }

  & .sign_in {
    font-size: 15px;
    font-weight: 700;
    margin-top: ${padding};
    color: #4f6fa5;
    cursor: pointer;
  }

  & .choose_photo{
    font-size: 16px;
    font-weight: 400;
    color: #5677AD;
  }

  & .hello_letter {
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    padding-bottom: 30px;
  }

  & .text-input {
    width: 290px;
    padding: 10px;
    text-align: center;
    font-weight: 400;
    font-size: 26px;
    border: 1px solid #e3e3e3;
    border-radius: 20px;
    margin-bottom: 32px;
    
    :focus {
      outline: 1px solid #DAD6CA;
    }
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
    color: #817F7A;
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
    background-color: #DAD6CA;
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

export const StyledAva = styled.div<{ backgroundImage?: string, size: number }>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  background-color: #e0e0e0;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 32px;
  color: #494949;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})` || ''};
  background-size: cover;
  
  .upload {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: none;

    input {
      display: none;
    }
  }

  :hover {
    .upload {
      display: flex;
    }

    span {
      display: none;
    }

    svg {
    color : "red";
}
  }
`;

export const StyledSubButton = styled.button`
  font-size: 15px;
  font-weight: 700;
  color: #4f6fa5;
  background-color: inherit;
  border: none;
  margin-top: 18px;
  cursor: pointer;
`
export const AlertMessage = styled.p`
  font-weight: 600;
  color: #ea0027;
  transition: all 0.2s ease-in-out;
  margin-top: 30px;
  font-size:1.4rem;
`;