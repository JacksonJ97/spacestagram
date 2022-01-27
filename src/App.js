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
  const { data, setData, error, getMoreData } = useFetch();

  return (
    <>
      <GlobalStyles />
      <Header />
      {error && <Error />}
      <Main data={data} setData={setData} getMoreData={getMoreData} />
      {data.length && <Footer />}
    </>
  );
};

export default App;
