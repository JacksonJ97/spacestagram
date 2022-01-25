import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

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

const Main = ({ data, getMoreData }) => {
  // const [isLiked, setIsLiked] = useState(false);
  const [savedCards, setSavedCards] = useState([]);

  const snackbarRef = useRef(null);
  // const card = { img, title, description, date, isLiked: !isLiked };

  useEffect(() => {
    console.log(savedCards);
    localStorage.setItem("liked", JSON.stringify(savedCards));
  }, [savedCards]);

  // const handleClick = () => {
  //   setIsLiked((prevState) => !prevState);

  //   if (!isLiked) {
  //     setSavedCards((prevState) => [...prevState, card]);
  //   } else {
  //     setSavedCards((prevState) => {
  //       if (prevState.find((item) => item.date === date)) {
  //         let newSavedCards = prevState.filter((item) => item.date !== date);
  //         return newSavedCards;
  //       }
  //     });
  //   }
  // };

  // const handleClick = () => {
  //   setIsLiked((prevState) => !prevState);
  // };

  return (
    <Wrapper>
      <section className="card-container">
        <InfiniteScroll style={{ overflow: "hidden" }} dataLength={data.length} next={getMoreData} hasMore={true} loader={<Loader />}>
          {data.map((item) => {
            if (item.media_type !== "image") return null;
            return <Card item={item} setSavedCards={setSavedCards} snackbarRef={snackbarRef} key={item.date} />;
          })}
        </InfiniteScroll>
      </section>
      <Snackbar ref={snackbarRef} />
    </Wrapper>
  );
};

export default Main;
