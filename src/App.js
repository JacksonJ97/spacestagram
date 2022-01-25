import { useEffect } from "react";

// Components
import Header from "./containers/Header";
import Main from "./containers/Main";
import Error from "./components/Error";
import Footer from "./containers/Footer";

// Hooks
import useFetch from "./hooks/useFetch";

// Global Styles
import GlobalStyles from "./GlobalStyles";

const App = () => {
  const { data, error, getMoreData } = useFetch();

  // useEffect(() => {
  //   localStorage.setItem("data", JSON.stringify(data));
  // }, [data]);
  // localStorage.clear();

  // const storedData = JSON.parse(localStorage.getItem("data"));
  // console.log(storedData);

  return (
    <>
      <GlobalStyles />
      <Header />
      {error && <Error />}
      <Main data={data} getMoreData={getMoreData} />
      {data.length && <Footer />}
    </>
  );
};

export default App;
