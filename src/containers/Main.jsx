import styled from "styled-components";
import { useRef } from "react";

// Components
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader";
import Snackbar from "../components/Snackbar";

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

const Main = ({ data, setData, getMoreData }) => {
  const snackbarRef = useRef(null);

  return (
    <Wrapper>
      <section className="card-container">
        <InfiniteScroll style={{ overflow: "hidden" }} dataLength={data.length} next={getMoreData} hasMore={true} loader={<Loader />}>
          {data.map((item) => {
            if (item.media_type !== "image") return null;
            return <Card item={item} setData={setData} snackbarRef={snackbarRef} key={item.date} />;
          })}
        </InfiniteScroll>
      </section>
      <Snackbar ref={snackbarRef} />
    </Wrapper>
  );
};

export default Main;
