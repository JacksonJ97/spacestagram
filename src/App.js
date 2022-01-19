import useFetch from "./hooks/useFetch";

// Components
import Header from "./containers/Header";
import Main from "./containers/Main";

// Helpers
import getStartDate from "./helpers/getStartDate";

// Global Styles
import GlobalStyles from "./GlobalStyles";

const App = () => {
  const startDate = getStartDate(new Date(), 7);
  const [data] = useFetch(startDate);
  console.log(data);
  console.log(startDate);

  return (
    <>
      <GlobalStyles />
      <Header />
      <Main data={data} />
    </>
  );
};

export default App;
