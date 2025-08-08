import { useQuery } from "@tanstack/react-query";
import { Routes, Route } from "react-router";
import { currentUserOptions } from "data/user/hooks";
import Layout from "components/Layout";
import ProtectedRoute from "components/ProtectedRoute";
import LoadingSpinner from "components/Loading/LoadingSpinner";
import Home from "pages/Home";
import Likes from "pages/Likes";
import Login from "pages/Login";
import Signup from "pages/Signup";
import NotFound from "pages/NotFound";
import PostDetails from "pages/PostDetails";

export default function App() {
  const { data: user, isPending: isUserPending } = useQuery({
    ...currentUserOptions,
  });

  if (isUserPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-(--background-color)">
        <LoadingSpinner />
      </div>
    );
  }

  const isLoggedIn = !!user;

  return (
    <Routes>
      <Route element={<Layout isLoggedIn={isLoggedIn} />}>
        <Route index element={<Home />} />
        <Route path="posts">
          <Route path=":date" element={<PostDetails />} />
        </Route>

        <Route element={<ProtectedRoute to="/login" isAllowed={isLoggedIn} />}>
          <Route path="likes" element={<Likes />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<ProtectedRoute to="/" isAllowed={!isLoggedIn} />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}
