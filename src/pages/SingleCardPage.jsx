import { useEffect } from "react";

// Components
import SingleCardMain from "../containers/SingleCardMain";

const SingleCardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <SingleCardMain />;
};

export default SingleCardPage;
