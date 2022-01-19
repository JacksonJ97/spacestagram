import styled from "styled-components";

// Components
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader";

// Styles
const Wrapper = styled.main`
  background-color: #fafafa;
  min-height: 100vh;

  .card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2em;
  }
`;

const Main = ({ data, getMoreData }) => {
  return (
    <Wrapper>
      <section className="card-container">
        <InfiniteScroll style={{ overflow: "hidden" }} dataLength={data.length} next={getMoreData} hasMore={true} loader={<Loader />}>
          {data.map((item) => {
            if (item.media_type !== "image") return null;
            return <Card img={item.url} title={item.title} description={item.explanation} date={item.date} key={item.date} />;
          })}
        </InfiniteScroll>
      </section>
    </Wrapper>
  );
};

export default Main;
