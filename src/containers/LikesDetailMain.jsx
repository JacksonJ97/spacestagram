import styled from "styled-components";
import { useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import leftArrow from "../assets/images/left-arrow-icon.svg";

// Context
import { MainContext } from "../App";

// Components
import Card from "../components/Card";
import Snackbar from "../components/Snackbar";

// Styles
const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #fafafa;
  min-height: calc(100vh - 60px);
  padding-top: 48px;
  padding-bottom: 24px;

  .back-button {
    position: absolute;
    left: 0;
    top: 0;
    height: 48px;
    width: 68px;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  @media (min-width: 790px) {
    .back-button {
      left: 1%;
      top: 5%;
    }
  }

  @media (min-width: 950px) {
    .back-button {
      left: 5%;
    }
  }

  @media (min-width: 1600px) {
    .back-button {
      left: 10%;
    }
  }
`;

const LikesDetailMain = () => {
  const navigate = useNavigate();
  const snackbarRef = useRef(null);
  const { id } = useParams();
  const { data } = useContext(MainContext);
  const item = data.find((element) => element.date === id);

  return (
    <Wrapper>
      <button className="back-button" type="button" aria-label="Back button" onClick={() => navigate(-1)}>
        <img src={leftArrow} alt="Back button" height="48" width="68" />
      </button>
      <Card item={item} snackbarRef={snackbarRef} />
      <Snackbar ref={snackbarRef} />
    </Wrapper>
  );
};

export default LikesDetailMain;
