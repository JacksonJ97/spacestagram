// Components
import Header from "./containers/Header";
import Main from "./containers/Main";
import Loader from "./components/Loader";

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
      {loading ? <Loader /> : <Main data={data} getMoreData={getMoreData} />}
      {error ? <h1>Error</h1> : null}
    </>
  );
};

export default App;
