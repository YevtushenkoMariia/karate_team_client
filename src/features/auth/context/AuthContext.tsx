import {
  createContext,
  useState,
  type ReactNode,
} from "react";

import type { StoredUserData } from "../types/auth.types";
import { authStorage } from "../services/authStorage";

interface AuthContextValue {
  user: StoredUserData | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: StoredUserData) => void;
  updateUser: (user: StoredUserData) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<StoredUserData | null>(
    () => authStorage.getUser()
  );

  const [token, setToken] = useState<string | null>(
    () => authStorage.getToken()
  );

  const isAuthenticated = Boolean(token && user);

  const login = (newToken: string, newUser: StoredUserData) => {
    authStorage.setToken(newToken);
    authStorage.setUser(newUser);

    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    authStorage.clear();

    setToken(null);
    setUser(null);
  };

  const updateUser = (newUser: StoredUserData) => {
    authStorage.setUser(newUser);
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}