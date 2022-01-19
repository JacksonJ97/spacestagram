// Components
import Header from "./containers/Header";
import Main from "./containers/Main";

// Hooks
import useFetch from "./hooks/useFetch";

// Global Styles
import GlobalStyles from "./GlobalStyles";

// Helpers
import getStartDate from "./helpers/getStartDate";

const App = () => {
  const startDate = getStartDate(new Date());
  const [data, loading, error] = useFetch(startDate);
  console.log(data);
  console.log(startDate);

  if (error) console.log(error);

  return (
    <>
      <GlobalStyles />
      <Header />
      {loading ? <h1>LOADING</h1> : <Main data={data} />}
    </>
  );
};

export default App;
