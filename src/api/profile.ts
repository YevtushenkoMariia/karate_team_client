import api from "./axios";
import { type ProfileRequest, type ProfileUpdateRequest } from "../types/profile.types";



export const getProfile = async (userData: ProfileRequest) => {
  const response = await api.get("/api/user/profile", {
    params: userData,
  });

  return response;
};

export const updateProfile = async (userData: ProfileUpdateRequest) => {
  const response = await api.put("/api/user/profile-update", userData);
  return response;
};