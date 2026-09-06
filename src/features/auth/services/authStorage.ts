import { TOKEN_KEY, USER_KEY } from "../constants/storage.constants";
import type { StoredUserData } from "../types/auth.types";

export const authStorage = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser(): StoredUserData | null {
    const raw = localStorage.getItem(USER_KEY);

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as StoredUserData;
    } catch {
      return null;
    }
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  setUser(user: StoredUserData) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};