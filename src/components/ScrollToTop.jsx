import styled from "styled-components";

// Styles
const Wrapper = styled.button`
  margin-right: 16px;
  margin-bottom: 16px;
  padding: 8px;
  border: none;
  background-color: #ffffff;
  border-radius: 50%;
  cursor: pointer;
`;

const ScrollToTop = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Wrapper onClick={handleClick}>
      <svg
        aria-label="Scroll to top"
        fill="none"
        width="40"
        height="40"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24">
        <line x1="12" x2="12" y1="20" y2="4" />
        <polyline points="6 10 12 4 18 10" />
      </svg>
    </Wrapper>
  );
};

export default ScrollToTop;
