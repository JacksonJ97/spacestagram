import { Toaster } from "sonner";
import { Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "components/Header";
import ProtectedRoute from "components/ProtectedRoute";
import Home from "pages/Home";
import PostDetails from "pages/PostDetails";
import Likes from "pages/Likes";
import NotFound from "pages/NotFound";

const client = new QueryClient();

export default function App() {
  const isUserLoggedIn = false; // TODO: Replace with actual authentication logic
  return (
    <QueryClientProvider client={client}>
      <Header isUserLoggedIn={isUserLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:date" element={<PostDetails />} />
        <Route
          path="/likes"
          element={
            <ProtectedRoute isAllowed={isUserLoggedIn} redirectPath="/">
              <Likes />
            </ProtectedRoute>
          }
        />
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
