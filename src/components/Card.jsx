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
`;

const Card = () => {
  return (
    <Wrapper>
      <header>
        <img src={avatar} alt="avatar" />
        <p role="link">nasa</p>
      </header>
      <div>Image</div>
      <button>Like Button</button>
      <h2>Title</h2>
      <p>Description</p>
      <p>Date</p>
    </Wrapper>
  );
};

export default Card;
