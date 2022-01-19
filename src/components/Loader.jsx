import styled from "styled-components";

// Styles
const Wrapper = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #8e8e8e;
  border-radius: 50%;
  margin: 24px auto;
  width: 60px;
  height: 60px;
  overflow: hidden; /* Test */
  animation: spin 1.25s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => {
  return <Wrapper></Wrapper>;
};

export default Loader;
