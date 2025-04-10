import { useState } from "react";

// Styles
const Wrapper = `
  border: none;
  background-color: transparent;
  padding: 8px;
  cursor: pointer;
`;

const ShareButton = ({ url, snackbarRef }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(url);
    snackbarRef.current.show();
  };

  const handleMouseEnter = () => {
    setIsHovered((prevState) => !prevState);
  };

  const handleMouseLeave = () => {
    setIsHovered((prevState) => !prevState);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        aria-label="Share Post"
        color={isHovered ? "#8e8e8e" : "#262626"}
        fill={isHovered ? "#8e8e8e" : "#262626"}
        height="24"
        width="24"
        role="img"
        viewBox="0 0 24 24"
      >
        <line
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          x1="22"
          x2="9.218"
          y1="3"
          y2="10.083"
        ></line>
        <polygon
          fill="none"
          points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
          stroke="currentColor"
          strokeWidth="2"
        ></polygon>
      </svg>
    </button>
  );
};

export default ShareButton;
