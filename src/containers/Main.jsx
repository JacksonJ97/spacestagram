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

const Main = ({ data }) => {
  return (
    <Wrapper>
      <section className="card-container">
        {data.map((item) => {
          if (item.media_type === "image") {
            return <Card img={item.url} title={item.title} description={item.explanation} date={item.date} key={item.date} />;
          } else {
            return null;
          }
        })}
      </section>
    </Wrapper>
  );
};

export default Main;
