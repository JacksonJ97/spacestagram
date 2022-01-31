import styled from "styled-components";
import { Link } from "react-router-dom";

// Styles
const Wrapper = styled.div`
  position: relative;
  padding-top: 100%;
  user-select: none;
  cursor: pointer;

  img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hover {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: transparent;
  }

  .hover:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  @media (min-width: 935px) {
    height: 293px;
    width: 293px;

    .hover {
      height: 293px;
      width: 293px;
    }
  }
`;

const PreviewCard = ({ item }) => {
  return (
    <Wrapper>
      <Link to={`/likes/${item.date}`}>
        <div className="hover"></div>
        <img src={item.url} alt={item.title} />
      </Link>
    </Wrapper>
  );
};

export default PreviewCard;
