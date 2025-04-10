import { Routes, Route } from "react-router";

// Components
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import Likes from "./pages/Likes";
import PostDetails from "./pages/PostDetails";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/likes/:id" element={<PostDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
