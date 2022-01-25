import styled from "styled-components";
import avatar from "../assets/images/nasa-avatar.jpg";
import { useState } from "react";

// Components
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";

// Styles
const Wrapper = styled.article`
  background-color: #ffffff;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 24px;
  width: 100%;

  header {
    display: flex;
    align-items: center;
    padding: 14px 16px;

    img {
      border-radius: 50%;
      width: 32px;
      height: 32px;
    }

    p {
      margin-left: 14px;
      font-size: 14px;
      font-weight: 600;
    }
  }

  figure {
    img {
      width: 100%;
      display: block;
    }
  }

  .actions-container {
    padding: 8px 8px 0px 8px;
  }

  .details-container {
    h2 {
      padding: 0 16px;
    }

    p {
      font-size: 14px;
      padding: 14px 16px;
    }

    .date {
      padding-top: 0;
      padding-bottom: 16px;
      font-size: 12px;
    }
  }

  @media (min-width: 635px) {
    width: 614px;
    border: 1px solid #dbdbdb;
  }
`;

const Card = ({ item, setSavedCards, snackbarRef }) => {
  const [isLiked, setIsLiked] = useState(false);
  const card = { img: item.url, title: item.title, explanation: item.explanation, date: item.date, isLiked: !isLiked };
  // const likedCards = localStorage.getItem(JSON.parse("liked"));
  // console.log(likedCards);

  const handleClick = () => {
    setIsLiked((prevState) => !prevState);

    if (!isLiked) {
      setSavedCards((prevState) => [...prevState, card]);
    } else {
      setSavedCards((prevState) => {
        if (prevState.find((element) => element.date === item.date)) {
          let newSavedCards = prevState.filter((element) => element.date !== item.date);
          return newSavedCards;
        }
      });
    }
  };

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

  return (
    <Wrapper>
      <header>
        <img src={avatar} alt="avatar" />
        <p>nasa</p>
      </header>

      <figure>
        <img src={item.url} alt={item.title} />
      </figure>

      <section className="actions-container">
        <LikeButton isLiked={isLiked} handleClick={handleClick} />
        <ShareButton url={item.url} snackbarRef={snackbarRef} />
      </section>

      <section className="details-container">
        <h2>{item.title}</h2>
        <p>{item.explanation}</p>
        <p className="date">{item.date}</p>
      </section>
    </Wrapper>
  );
};

export default Card;
