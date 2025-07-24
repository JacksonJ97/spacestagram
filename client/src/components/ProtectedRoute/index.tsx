import { Outlet, Navigate } from "react-router";

export default function ProtectedRoute({
  isAllowed,
  redirectPath,
  children,
}: {
  isAllowed: boolean;
  redirectPath: string;
  children?: React.ReactNode;
}) {
  if (!isAllowed) {
    return (
      <Navigate
        replace
        to={redirectPath}
        state={{ redirectUrl: window.location.pathname }}
      />
    );
  }

  return children ? children : <Outlet />;
}
