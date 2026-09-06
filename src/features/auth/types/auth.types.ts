

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  role: Role;
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string
};

export type Role = "ADMIN" | "SPORTSMAN" | "COACH";

export type StoredUserData = {
  id: string;
  role: Role;
  name: string;
  surname: string;
};