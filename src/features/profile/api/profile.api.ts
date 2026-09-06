import api from "../../../shared/api/axios.api";
import {
  type ProfileRequest,
  type ProfileUpdateRequest,
} from "../types/profile.types";
import type { ProfileResponse } from "../types/response.type";
import type { IAuthApi } from "./api.interface";

export class AuthApi implements IAuthApi {
  public async getProfile(userData: ProfileRequest): Promise<ProfileResponse> {
    const response = await api.get("/api/user/profile", {
      params: userData,
    });

    console.log("getProfile response:", response);
    return response.data;
  }

  public async updateProfile(userData: ProfileUpdateRequest): Promise<ProfileResponse> {
    const response = await api.put("/api/user/profile-update", userData);
    console.log("updateProfile response:", response);
    return response.data;
  }
}

export const authApiInstance = new AuthApi();
