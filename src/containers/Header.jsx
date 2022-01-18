import styled from "styled-components";

// Styles
const Wrapper = styled.header`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #dbdbdb;
  position: sticky;
  top: 0;
  height: 60px;

  .container {
    width: 614px;
    margin: 0 auto;
  }

  h1 {
    font-family: "Lobster Two", cursive;
    font-size: 1.75rem;
    font-weight: 400;
    cursor: pointer;
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <div className="container">
        <h1>Spacestagram</h1>
      </div>
    </Wrapper>
  );
};

export default Header;
