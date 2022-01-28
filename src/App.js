import { useState, useEffect } from "react";

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

const API_KEY = "vpfxs1OC6eDlkX7dTgWIOefdmQ6R81WZ48g4LneR";
const BASE_URL = "https://api.nasa.gov/planetary/apod?api_key=";

const App = () => {
  const { date: initialStartDate, param: initialDateParam } = getStartDate(new Date());
  const [startDate, setStartDate] = useState(() => {
    const { date: nextStartDate, param: nextStartDateParam } = getStartDate(initialStartDate);
    return { date: nextStartDate, param: nextStartDateParam };
  });
  const url = `${BASE_URL}${API_KEY}&start_date=${initialDateParam}`;

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  const { data, setData, error, getMoreData } = useFetch(url);

  return (
    <>
      <GlobalStyles />
      <Header />
      {error && <Error />}
      <Main data={data} setData={setData} startDate={startDate} setStartDate={setStartDate} getMoreData={getMoreData} />
      {data.length && <Footer />}
    </>
  );
};

export default App;
