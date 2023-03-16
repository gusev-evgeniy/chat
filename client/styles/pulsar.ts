import styled from "styled-components";

export const PulsarDot = styled.div<{ rgb: string }>`
 background-color: ${({ rgb }) => `rgb(${rgb})`};
 display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow: 0px 0px 1px 1px #0000001a;
  animation: pulse-animation 2s infinite;

@keyframes pulse-animation {
  0% {
    box-shadow: ${({ rgb }) => ` 0 0 0 0px rgba(${rgb}, 0.8)`};
  }
  100% {
    box-shadow: ${({ rgb }) => ` 0 0 5px 7px rgb(${rgb}, 0)`};
  }
}

.master{
  color:black;
  float:right;
}

@media (max-width:900px){
  .master{
    display:none
  }
}
`