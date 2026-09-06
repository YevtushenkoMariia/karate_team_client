import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";


import type { Role } from "../shared/types/roles";
import { useAuth } from "../features/auth/hooks/useAuth";

type RoleRouteProps = {
  children: ReactNode;
  allowedRoles: Role[];
};

export default function RoleRoute({
  children,
  allowedRoles,
}: RoleRouteProps) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}