import { useEffect } from "react";
// Components
import LikesDetailMain from "../containers/LikesDetailMain";

const LikesDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <LikesDetailMain />;
};

export default LikesDetailPage;
