import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { fetchData } from "./features/data/dataSlice";

// Components
import Header from "./containers/Header";
import Error from "./components/Error";

// Pages
import Homepage from "./pages/Homepage";
import LikesPage from "./pages/LikesPage";
import SingleCardPage from "./pages/SingleCardPage";

// Global Styles
import GlobalStyles from "./GlobalStyles";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { param: startDateParam } = useSelector((state) => state.startDate);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    dispatch(fetchData(startDateParam));
  }, [dispatch, startDateParam]);

  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [navigate, error]);

  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/likes" element={<LikesPage />} />
        <Route path="/likes/:id" element={<SingleCardPage />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
