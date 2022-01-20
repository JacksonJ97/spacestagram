import styled from "styled-components";
import { useState, forwardRef, useImperativeHandle } from "react";

// Styles
const Wrapper = styled.div`
  position: fixed;
  bottom: 6%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: #ffffff;
  background-color: #262626;
  padding: 14px 16px;
  width: 90%;
  border-radius: 4px;
  box-shadow: 0px 3px 5px -1px rgb(0, 0, 0, 0.2), 0px 6px 10px 0px rgb(0, 0, 0, 0.14), 0px 1px 18px 0px rgb(0, 0, 0, 0.12);
  visibility: ${(props) => (props.showSnackbar ? "visible" : "hidden")};
  /* -webkit-animation: "fade-in 0.5s, fade-out 0.5s 0.9s";
  animation: "fade-in 0.5s, fade-out 0.5s 0.9s";

  @keyframes fade-in {
    0% {
      bottom: 0;
      opacity: 0;
    }

    100% {
      bottom: 6%;
      opacity: 1;
    }
  }

  @keyframes fade-out {
    0% {
      bottom: 0;
      opacity: 0;
    }

    100% {
      bottom: 6%;
      opacity: 1;
    }
  } */

  @media (min-width: 635px) {
    width: 360px;
  }
`;

const Snackbar = forwardRef((props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setShowSnackbar((prevState) => !prevState);
      setTimeout(() => {
        setShowSnackbar((prevState) => !prevState);
      }, 2000);
    },
  }));

  return <Wrapper showSnackbar={showSnackbar}>Link copied to your clipboard</Wrapper>;
});

export default Snackbar;
