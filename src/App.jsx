import { Routes, Route, useNavigate } from "react-router-dom";

// Components
import Header from "./containers/Header";
import Error from "./components/Error";

// Pages
import Homepage from "./pages/Homepage";
import LikesPage from "./pages/LikesPage";
import SingleCardPage from "./pages/SingleCardPage";

// Global Styles
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/likes" element={<LikesPage />} />
        <Route path="/likes/:id" element={<SingleCardPage />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
