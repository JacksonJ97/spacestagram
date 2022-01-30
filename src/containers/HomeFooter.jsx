import styled from "styled-components";

// Components
import ScrollToTop from "../components/ScrollToTop";

// Styles
const Wrapper = styled.footer`
  position: sticky;
  bottom: 0;
`;

const Footer = () => {
  return (
    <Wrapper>
      <ScrollToTop />
    </Wrapper>
  );
};

export default Footer;
