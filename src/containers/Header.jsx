import styled from "styled-components";
import { NavLink } from "react-router-dom";

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
  z-index: 10;
  height: 60px;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 614px;
    margin: 0 auto;
  }

  a {
    text-decoration: none;
    color: #262626;
  }

  h1 {
    font-family: "Lobster Two", cursive;
    font-size: 1.75rem;
    font-weight: 400;
    width: max-content;
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <div className="container">
        <NavLink to="/">
          <h1>Spacestagram</h1>
        </NavLink>
        <NavBar />
      </div>
    </Wrapper>
  );
};

export default Header;
