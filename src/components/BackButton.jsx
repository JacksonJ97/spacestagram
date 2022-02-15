import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import leftArrow from "../assets/images/left-arrow-icon.svg";

// Styles
const Wrapper = styled.button`
  position: absolute;
  left: 0;
  top: 6px;
  height: 48px;
  width: 68px;
  border: none;
  background: transparent;
  cursor: pointer;

  @media (min-width: 1400px) {
    left: 12%;
  }
`;

const BackButton = ({ to }) => {
  const navigate = useNavigate();

  return (
    <Wrapper type="button" aria-label="Back button" onClick={() => navigate(to)}>
      <img src={leftArrow} alt="Back button" height="48" width="68" />
    </Wrapper>
  );
};

export default BackButton;
