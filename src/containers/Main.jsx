import styled from "styled-components";

// Components
import Card from "../components/Card";

// Styles
const Wrapper = styled.main`
  background-color: #fafafa;
  min-height: 100vh; /* Test */

  .card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2em;
  }
`;

const Main = () => {
  return (
    <Wrapper>
      <section className="card-container">
        <Card />
        <Card />
      </section>
    </Wrapper>
  );
};

export default Main;
