import styled from "styled-components";

// Styles
const Wrapper = styled.header`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #dbdbdb;
  height: 60px; /* Test */

  .logo {
    font-family: "Lobster Two", cursive;
    font-size: 1.75rem;
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <div className="logo">Spacestagram</div>
    </Wrapper>
  );
};

export default Header;
