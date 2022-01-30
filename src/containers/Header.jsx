import styled from "styled-components";

// Components
import NavBar from "../components/NavBar";

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
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 614px;
    margin: 0 auto;
  }

  h1 {
    font-family: "Lobster Two", cursive;
    font-size: 1.75rem;
    font-weight: 400;
    cursor: pointer;
    width: max-content;
  }
`;

const Header = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Wrapper>
      <div className="container">
        <h1 onClick={handleClick}>Spacestagram</h1>
        <NavBar />
      </div>
    </Wrapper>
  );
};

export default Header;
