import styled from "styled-components";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Selectors
import { selectByDataId } from "../features/data/dataSlice";

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
  padding-top: 60px;
  padding-bottom: 24px;
`;

const LikesDetailMain = () => {
  const { id } = useParams();
  const item = useSelector((state) => selectByDataId(state, id));
  const snackbarRef = useRef(null);

  return (
    <Wrapper>
      <BackButton to={-1} />
      <Card item={item} snackbarRef={snackbarRef} />
      <Snackbar ref={snackbarRef} />
    </Wrapper>
  );
};

export default LikesDetailMain;
