import { Toaster } from "sonner";
import { Routes, Route, Outlet } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "components/Header";
import ProtectedRoute from "components/ProtectedRoute";
import Home from "pages/Home";
import PostDetails from "pages/PostDetails";
import Likes from "pages/Likes";
import NotFound from "pages/NotFound";
import Login from "pages/Login";
import Signup from "pages/Signup";

const client = new QueryClient();

function AppLayout({ isUserLoggedIn }: { isUserLoggedIn: boolean }) {
  return (
    <>
      <Header isUserLoggedIn={isUserLoggedIn} />
      <main className="min-h-[calc(100vh-60px)] bg-(--background-color) px-4 py-8">
        <Outlet />
      </main>
    </>
  );
}

export default function App() {
  const isUserLoggedIn = false; // TODO: Replace with actual authentication logic
  return (
    <QueryClientProvider client={client}>
      <Routes>
        <Route element={<AppLayout isUserLoggedIn={isUserLoggedIn} />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:date" element={<PostDetails />} />
          <Route
            path="/likes"
            element={
              <ProtectedRoute redirectPath="/login" isAllowed={isUserLoggedIn}>
                <Likes />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="/login"
          element={
            <ProtectedRoute redirectPath="/" isAllowed={!isUserLoggedIn}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute redirectPath="/" isAllowed={!isUserLoggedIn}>
              <Signup />
            </ProtectedRoute>
          }
        />
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
