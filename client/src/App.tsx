import { Toaster } from "sonner";
import { Routes, Route, Outlet } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { currentUserOptions } from "data/user/hooks";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import ProtectedRoute from "components/ProtectedRoute";
import LoadingSpinner from "components/Loading/LoadingSpinner";
import Home from "pages/Home";
import Likes from "pages/Likes";
import Login from "pages/Login";
import Signup from "pages/Signup";
import NotFound from "pages/NotFound";
import PostDetails from "pages/PostDetails";

const client = new QueryClient();

function GuestLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-(--background-color) px-4 py-8">
        <Outlet />
      </main>
    </>
  );
}

function UserLayout() {
  return (
    <div className="flex h-screen flex-col-reverse min-sm:flex-row">
      <Sidebar />
      <main className="h-full w-full overflow-auto bg-(--background-color) px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

function AppRoutes() {
  const { data: user, isPending: isUserPending } = useQuery({
    ...currentUserOptions,
  });
  const isUserLoggedIn = !!user;

  if (isUserPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-(--background-color)">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={isUserLoggedIn ? <UserLayout /> : <GuestLayout />}
      >
        <Route index element={<Home />} />
        <Route path="posts/:date" element={<PostDetails />} />
        <Route
          path="likes"
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
  );
}

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <AppRoutes />
      <Toaster richColors visibleToasts={1} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
