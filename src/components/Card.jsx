import styled from "styled-components";
import avatar from "../assets/images/nasa-avatar.jpg";

// Styles
const Wrapper = styled.article`
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
  margin-bottom: 1em;
  width: 650px;

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
    }
  }

  .actions-container {
    padding: 10px 16px;

    button {
      border: none;
      background-color: transparent;
      cursor: pointer;
    }

    .like-button svg {
      color: #262626;
      fill: #262626;
      height: 24px;
      width: 24px;
    }

    .like-button:hover svg {
      color: #8e8e8e;
      fill: #8e8e8e;
      height: 24px;
      width: 24px;
    }
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
    }
  }
`;

const Card = ({ img, title, description, date }) => {
  return (
    <Wrapper>
      <header>
        <img src={avatar} alt="avatar" />
        <p role="link">nasa</p>
      </header>

      <figure>
        <img src={img} alt={title} />
      </figure>

      <section className="actions-container">
        <button className="like-button" type="button">
          <svg aria-label="Like" role="img" viewBox="0 0 24 24">
            <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
          </svg>
        </button>
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
