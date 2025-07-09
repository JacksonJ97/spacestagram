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
    return <Navigate replace to={redirectPath} />;
  }

  return children ? children : <Outlet />;
}
