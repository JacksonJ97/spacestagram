import styled from "styled-components";
import { useContext } from "react";

// Context
import { MainContext } from "../App";

// Components
import PreviewCard from "../components/PreviewCard";

// Styles
const Wrapper = styled.main`
  background-color: #fafafa;
  min-height: calc(100vh - 60px);

  .cards-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3px;
    padding-top: 60px;
    width: 100%;
    margin: 0 auto;
  }

  @media (min-width: 735px) {
    .cards-container {
      gap: 28px;
    }
  }

  @media (min-width: 935px) {
    .cards-container {
      width: 935px;
    }
  }
`;

const LikesMain = () => {
  const { data } = useContext(MainContext);
  return (
    <Wrapper>
      <section className="cards-container">
        {data.map((item) => {
          if (!item.liked) return null;
          return <PreviewCard url={item.url} title={item.title} key={item.date} />;
        })}
      </section>
    </Wrapper>
  );
};

export default LikesMain;
