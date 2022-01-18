import useFetch from "./hooks/useFetch";

// Components
import Header from "./containers/Header";
import Main from "./containers/Main";

// Global Styles
import GlobalStyles from "./GlobalStyles";

const App = () => {
  const [data] = useFetch();
  console.log(data);

  return (
    <>
      <GlobalStyles />
      <Header />
      <Main data={data} />
    </>
  );
};

export default App;
