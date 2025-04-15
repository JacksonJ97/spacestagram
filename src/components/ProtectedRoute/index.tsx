import { Outlet, Navigate } from "react-router";

type ProtectedRouteProps = {
  isAllowed: boolean;
  redirectPath: string;
  children?: React.ReactNode;
};

export default function ProtectedRoute({
  isAllowed,
  redirectPath,
  children,
}: ProtectedRouteProps) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}
