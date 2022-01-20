import styled from "styled-components";
import avatar from "../assets/images/nasa-avatar.jpg";

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

const Card = ({ img, title, description, date, snackbarRef }) => {
  return (
    <Wrapper>
      <header>
        <img src={avatar} alt="avatar" />
        <p>nasa</p>
      </header>

      <figure>
        <img src={img} alt={title} />
      </figure>

      <section className="actions-container">
        <LikeButton />
        <ShareButton url={img} snackbarRef={snackbarRef} />
      </section>

      <section className="details-container">
        <h2>{title}</h2>
        <p>{description}</p>
        <p className="date">{date}</p>
      </section>
    </Wrapper>
  );
};

export default Card;
