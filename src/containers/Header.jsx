import styled from "styled-components";

// Styles
const Wrapper = styled.header`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #dbdbdb;
  position: sticky;
  top: 0;
  height: 60px; /* Test */

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
      <h1>Spacestagram</h1>
    </Wrapper>
  );
};

export default Header;
