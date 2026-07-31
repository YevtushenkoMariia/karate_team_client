import api from "./axios";
import { type LoginRequest } from "../types/auth.types";
import { type RegisterRequest } from "../types/auth.types";

export const login = async (credentials: LoginRequest) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const register = async (requestData: RegisterRequest) => {
  const response = await api.post("/auth/register", requestData);
  return response.data;
};
