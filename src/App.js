import useFetch from "./hooks/useFetch";

const App = () => {
  const [data] = useFetch();
  console.log(data);

  return <div>Hello World!</div>;
};

export default App;
