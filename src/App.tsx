import { Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Components
import Header from "components/Header";

// Pages
import Home from "pages/Home";
import Likes from "pages/Likes";
import PostDetails from "pages/PostDetails";
import NotFound from "pages/NotFound";

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/likes/:id" element={<PostDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
