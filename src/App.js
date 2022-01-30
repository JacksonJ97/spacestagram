import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Components
import Header from "./containers/Header";
import Homepage from "./pages/Homepage";
import Error from "./components/Error";

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
  const { date: initialStartDate, param: initialStartDateParam } = getStartDate(new Date());
  const url = `${BASE_URL}${initialStartDateParam}`;
  const { data, setData, error, getMoreData } = useFetch(url);
  let navigate = useNavigate();

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
          <Route path="likes" element={<main>Likes</main>}>
            <Route path=":id" element={<div>Picture</div>} />
          </Route>
          <Route path="error" element={<Error />} />
        </Routes>
      </MainContext.Provider>
    </>
  );
};

export default App;
