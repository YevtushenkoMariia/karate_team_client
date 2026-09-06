import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Plans from "../pages/Plans";
import Groups from "../pages/Groups";
import GroupInfo from "../pages/GroupInfo";
import Sportsmens from "../pages/Sportsmens";
import Statistics from "../pages/Statistics";
import Messages from "../pages/Messages";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import AppLayout from "../shared/layout/AppLayout";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import type { Role } from "../features/auth/types/auth.types";

const APP_ROLES: Role[] = ["ADMIN", "COACH", "SPORTSMAN"];

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={APP_ROLES}>
              <AppLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:groupId" element={<GroupInfo />} />
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