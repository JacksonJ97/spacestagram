import styled from "styled-components";
import { useContext, useRef } from "react";
import { useParams } from "react-router-dom";

// Context
import { MainContext } from "../App";

// Components
import Card from "../components/Card";
import BackButton from "../components/BackButton";
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
`;

const LikesDetailMain = () => {
  const snackbarRef = useRef(null);
  const { id } = useParams();
  const { data } = useContext(MainContext);
  const item = data.find((element) => element.date === id);

  return (
    <Wrapper>
      <BackButton />
      <Card item={item} snackbarRef={snackbarRef} />
      <Snackbar ref={snackbarRef} />
    </Wrapper>
  );
};

export default LikesDetailMain;
