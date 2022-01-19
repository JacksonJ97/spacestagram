// Components
import Header from "./containers/Header";
import Main from "./containers/Main";
import Error from "./components/Error";

// Hooks
import useFetch from "./hooks/useFetch";

// Global Styles
import GlobalStyles from "./GlobalStyles";

const App = () => {
  const { data, error, getMoreData } = useFetch();
  console.log(data);

  return (
    <>
      <GlobalStyles />
      <Header />
      {error && <Error />}
      <Main data={data} getMoreData={getMoreData} />
    </>
  );
};

export default App;
