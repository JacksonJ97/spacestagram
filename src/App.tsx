import { Toaster } from "sonner";
import { Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "components/Header";
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
        <Route path="/posts/:date" element={<PostDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster
        visibleToasts={1}
        toastOptions={{
          style: {
            border: "1px solid var(--contrast-background-color)",
            background: "var(--contrast-background-color)",
            color: "var(--contrast-text-color)",
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
