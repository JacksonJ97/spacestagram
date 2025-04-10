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

  .cards-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2em;
  }
`;

const HomeMain = () => {
  // Placeholder for data
  const data = [];
  const snackbarRef = useRef(null);

  const handleNext = () => {
    // Implement logic for fetching next data
    console.log("Fetch next data...");
  };

  return (
    <Wrapper>
      <InfiniteScroll
        dataLength={data.length}
        next={handleNext}
        scrollThreshold={0.9}
        hasMore={true}
        loader={<Loader />}
      >
        <section className="cards-container">
          {data.map((item) => (
            <Card item={item} snackbarRef={snackbarRef} key={item.date} />
          ))}
        </section>
      </InfiniteScroll>

      <Snackbar ref={snackbarRef} />
    </Wrapper>
  );
};

export default HomeMain;
