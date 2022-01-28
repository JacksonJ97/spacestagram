import styled from "styled-components";
import { useRef } from "react";

// Components
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader";
import Snackbar from "../components/Snackbar";

// Helpers
import getStartDate from "../helpers/getStartDate";

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

const API_KEY = "vpfxs1OC6eDlkX7dTgWIOefdmQ6R81WZ48g4LneR";
const BASE_URL = "https://api.nasa.gov/planetary/apod?api_key=";

const Main = ({ data, startDate, setStartDate, setData, getMoreData }) => {
  const snackbarRef = useRef(null);

  const handleNext = () => {
    setStartDate((prevState) => {
      const { date: nextStartDate, param: nextStartDateParam } = getStartDate(prevState.date);
      return { date: nextStartDate, param: nextStartDateParam };
    });
    const url = `${BASE_URL}${API_KEY}&start_date=${startDate.param}`;
    getMoreData(url);
  };

  return (
    <Wrapper>
      <InfiniteScroll dataLength={data.length} next={handleNext} hasMore={true} loader={<Loader />}>
        <section className="card-container">
          {data.map((item) => {
            if (item.media_type !== "image") return null;
            return <Card item={item} setData={setData} snackbarRef={snackbarRef} key={item.date} />;
          })}
        </section>
      </InfiniteScroll>

      <Snackbar ref={snackbarRef} />
    </Wrapper>
  );
};

export default Main;
