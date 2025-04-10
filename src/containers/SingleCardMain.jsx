import { useRef } from "react";
import styled from "styled-components";

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

const SingleCardMain = () => {
  const snackbarRef = useRef(null);

  const item = {
    url: "https://example.com/image.jpg",
    title: "Sample Title",
    date: "2023-10-01",
    liked: false,
    description: "Sample Description",
    explaination: "Sample Explanation",
  };

  return (
    <Wrapper>
      <BackButton to={-1} />
      <Card item={item} snackbarRef={snackbarRef} />
      <Snackbar ref={snackbarRef} />
    </Wrapper>
  );
};

export default SingleCardMain;
