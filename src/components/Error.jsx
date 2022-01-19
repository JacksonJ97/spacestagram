import styled from "styled-components";

// Styles
const Wrapper = styled.main`
  background-color: #fafafa;
  height: calc(100vh - 60px);

  .container {
    padding: 40px;
  }

  h2 {
    font-size: 22px;
    font-weight: 600;
    text-align: center;
  }

  p {
    margin-top: 40px;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const Error = () => {
  return (
    <Wrapper>
      <div className="container">
        <h2>Sorry, this page isn't available.</h2>
        <p>The link you followed may be broken, or the page may have been removed.</p>
      </div>
    </Wrapper>
  );
};

export default Error;
