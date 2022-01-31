import { useEffect } from "react";

// Component
import LikesMain from "../containers/LikesMain";

const LikesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <LikesMain />;
};

export default LikesPage;
