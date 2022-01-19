import styled from "styled-components";

// Components
import ScrollToTop from "../components/ScrollToTop";

// Styles
const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  bottom: 0;
  /* height: 60px; */
`;

const Footer = () => {
  return (
    <Wrapper>
      <ScrollToTop />
    </Wrapper>
  );
};

export default Footer;
