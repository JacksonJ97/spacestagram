import styled from "styled-components";
import { useRef, useContext } from "react";

// Context
import { MainContext } from "../App";

// Components
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader";
import Snackbar from "../components/Snackbar";

// Helpers
import getStartDate from "../helpers/getStartDate";

// Config
import { BASE_URL } from "../config";

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

const Main = () => {
  const { data, startDate, setStartDate, getMoreData } = useContext(MainContext);
  const snackbarRef = useRef(null);

  const handleNext = () => {
    const url = `${BASE_URL}${startDate.param}`;
    getMoreData(url);

    setStartDate((prevState) => {
      const { date: nextStartDate, param: nextStartDateParam } = getStartDate(prevState.date);
      return { date: nextStartDate, param: nextStartDateParam };
    });
  };

  return (
    <Wrapper>
      <InfiniteScroll dataLength={data.length} next={handleNext} hasMore={true} loader={<Loader />}>
        <section className="card-container">
          {data.map((item) => {
            if (item.media_type !== "image") return null;
            return <Card item={item} snackbarRef={snackbarRef} key={item.date} />;
          })}
        </section>
      </InfiniteScroll>

      <Snackbar ref={snackbarRef} />
    </Wrapper>
  );
};

export default Main;
