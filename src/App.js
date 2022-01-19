// Components
import Header from "./containers/Header";
import Main from "./containers/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Footer from "./containers/Footer";

// Hooks
import useFetch from "./hooks/useFetch";

// Global Styles
import GlobalStyles from "./GlobalStyles";

const App = () => {
  const { data, loading, error, getMoreData } = useFetch();
  console.log(data);

  return (
    <>
      <GlobalStyles />
      <Header />
      {error && <Error />}
      {loading ? <Loader /> : <Main data={data} getMoreData={getMoreData} />}
      <Footer />
    </>
  );
};

export default App;
