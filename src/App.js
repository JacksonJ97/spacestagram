import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Components
import Header from "./containers/Header";
import Error from "./components/Error";

// Pages
import Homepage from "./pages/Homepage";
import LikesPage from "./pages/LikesPage";
import LikesDetailPage from "./pages/LikesDetailPage";

// Hooks
import useFetch from "./hooks/useFetch";

// Helpers
import getStartDate from "./helpers/getStartDate";

// Global Styles
import GlobalStyles from "./GlobalStyles";

// Config
import { BASE_URL } from "./config";

// Create Context
export const MainContext = createContext(null);

const App = () => {
  const navigate = useNavigate();
  const { date: initialStartDate, param: initialStartDateParam } = getStartDate(new Date());
  const url = `${BASE_URL}${initialStartDateParam}`;
  const { data, setData, error, getMoreData } = useFetch(url);

  const [startDate, setStartDate] = useState(() => {
    const { date: nextStartDate, param: nextStartDateParam } = getStartDate(initialStartDate);
    return { date: nextStartDate, param: nextStartDateParam };
  });

  useEffect(() => {
    if (error) {
      navigate("error");
    }
  }, [error, navigate]);

  return (
    <>
      <GlobalStyles />
      <Header />
      <MainContext.Provider value={{ data, setData, startDate, setStartDate, getMoreData }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/likes" element={<LikesPage />} />
          <Route path="/likes/:id" element={<LikesDetailPage />} />
          <Route path="error" element={<Error />} />
        </Routes>
      </MainContext.Provider>
    </>
  );
};

export default App;
