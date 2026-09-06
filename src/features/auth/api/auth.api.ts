import api from "../../../shared/api/axios.api";
import { type LoginRequest } from "../types/auth.types";
import { type RegisterRequest } from "../types/auth.types";

export const login = async (credentials: LoginRequest) => {
  const response = await api.post("/api/auth/login", credentials);
  return response.data;
};

export const register = async (requestData: RegisterRequest) => {
  const response = await api.post("/api/auth/register", requestData);
  return response.data;
};
