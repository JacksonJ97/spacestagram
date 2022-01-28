import { useState, createContext } from "react";

// Components
import Header from "./containers/Header";
import Main from "./containers/Main";
import Error from "./components/Error";
import Footer from "./containers/Footer";

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
  const { date: initialStartDate, param: initialDateParam } = getStartDate(new Date());
  const url = `${BASE_URL}${initialDateParam}`;
  const { data, setData, error, getMoreData } = useFetch(url);

  const [startDate, setStartDate] = useState(() => {
    const { date: nextStartDate, param: nextStartDateParam } = getStartDate(initialStartDate);
    return { date: nextStartDate, param: nextStartDateParam };
  });

  return (
    <>
      <GlobalStyles />
      <Header />
      {error && <Error />}
      <MainContext.Provider value={{ data, setData, startDate, setStartDate, getMoreData }}>
        <Main />
      </MainContext.Provider>
      {data.length && <Footer />}
    </>
  );
};

export default App;
