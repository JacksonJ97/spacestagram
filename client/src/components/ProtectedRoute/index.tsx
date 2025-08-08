import { Outlet, Navigate } from "react-router";

export default function ProtectedRoute({
  to,
  isAllowed,
}: {
  to: string;
  isAllowed: boolean;
}) {
  if (!isAllowed) {
    return (
      <Navigate
        replace
        to={to}
        state={{ redirectUrl: window.location.pathname }}
      />
    );
  }

  return <Outlet />;
}
