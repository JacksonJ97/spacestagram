import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchData } from "./features/data/dataSlice";

// Components
import Header from "./containers/Header";
import Error from "./components/Error";

// Pages
import Homepage from "./pages/Homepage";
import LikesPage from "./pages/LikesPage";
import LikesDetailPage from "./pages/LikesDetailPage";

// Hooks
import useFetch from "./hooks/useFetch";
import useLocalStorage from "./hooks/useLocalStorage";

// Helpers
import getStartDate from "./helpers/getStartDate";

// Global Styles
import GlobalStyles from "./GlobalStyles";

// Config
import { BASE_URL } from "./config";

// Create Context
export const MainContext = createContext(null);

const App = () => {
  // const { date: initialStartDate, param: initialStartDateParam } = getStartDate(new Date());
  // const { date: nextStartDate, param: nextStartDateParam } = getStartDate(initialStartDate);

  // const [date, setDate] = useLocalStorage("date", null);
  // const [startDate, setStartDate] = useLocalStorage("start-date", null);
  // const [shouldFetch, setShouldFetch] = useState(false);

  // const checkStrings = initialStartDateParam.localeCompare(date);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // useEffect(() => {
  //   if (checkStrings !== 0) {
  //     setShouldFetch(true);
  //     setDate(initialStartDateParam);
  //     setStartDate({ date: nextStartDate, param: nextStartDateParam });
  //   } else {
  //     setShouldFetch(false);
  //   }
  // }, [checkStrings, initialStartDateParam, nextStartDate, nextStartDateParam, setShouldFetch, setDate, setStartDate]);

  // const url = `${BASE_URL}${initialStartDateParam}`;
  // const { data, setData, error, getMoreData } = useFetch(url, shouldFetch);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (error) {
  //     navigate("error");
  //   }
  // }, [error, navigate]);

  return (
    <>
      <GlobalStyles />
      <Header />
      {/* <MainContext.Provider value={{ data, setData, startDate, setStartDate, getMoreData }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/likes" element={<LikesPage />} />
          <Route path="/likes/:id" element={<LikesDetailPage />} />
          <Route path="error" element={<Error />} />
        </Routes>
      </MainContext.Provider> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/likes" element={<LikesPage />} />
        <Route path="/likes/:id" element={<LikesDetailPage />} />
        <Route path="error" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
