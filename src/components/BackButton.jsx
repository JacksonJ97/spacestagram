import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import leftArrow from "../assets/images/left-arrow-icon.svg";

// Styles
const Wrapper = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  height: 48px;
  width: 68px;
  border: none;
  background: transparent;
  cursor: pointer;

  @media (min-width: 790px) {
    left: 1%;
    top: 5%;
  }

  @media (min-width: 950px) {
    left: 5%;
  }

  @media (min-width: 1600px) {
    left: 10%;
  }
`;

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Wrapper className="back-button" type="button" aria-label="Back button" onClick={() => navigate(-1)}>
      <img src={leftArrow} alt="Back button" height="48" width="68" />
    </Wrapper>
  );
};

export default BackButton;
