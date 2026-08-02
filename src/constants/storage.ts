// constants/storage.ts
import type { Role } from "../types/auth.types";

export const TOKEN_KEY = "token";
export const USER_KEY = "user";
export const USER_UPDATED_EVENT = "user-updated";

export type StoredUser = {
  id?: string;
  role?: Role;
  name?: string;
  surname?: string;
};

export function getStoredUser(): StoredUser {
  const raw = localStorage.getItem(USER_KEY);

  if (!raw) {
    console.log("No user found");
    return {};
  }

  try {
    return JSON.parse(raw) as StoredUser;
  } catch (error) {
    console.log("Error parsing user", error);
    return {};
  }
}

export function setStoredUser(user: StoredUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(USER_UPDATED_EVENT));
}
