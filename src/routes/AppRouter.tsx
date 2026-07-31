import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Plans from "../pages/Plans";
import Groups from "../pages/Groups";
import Sportsmens from "../pages/Sportsmens";
import Statistics from "../pages/Statistics";
import Messages from "../pages/Messages";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import AppLayout from "../components/AppLayout";
import type { Role } from "../types/auth.types";
import { TOKEN_KEY, USER_KEY } from "../constants/storage";

function getStoredUser(): { role: Role } | null {
  const raw = localStorage.getItem(USER_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as { role: Role };
  } catch {
    return null;
  }
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function RoleRoute({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: Role[];
}) {
  const user = getStoredUser();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

const appRoles: Role[] = ["ADMIN", "COACH", "SPORTSMAN"];

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={appRoles}>
              <AppLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/sportsmens" element={<Sportsmens />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
