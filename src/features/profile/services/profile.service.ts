import type { Role } from "../../../shared/types/roles";
import type { IAuthApi } from "../api/api.interface";
import { authApiInstance } from "../api/profile.api";
import type {
  ProfileRequest,
  ProfileUpdateRequest
} from "../types/profile.types";
import type { ProfileResponse } from "../types/response.type";

export class UserService {
  private auth: IAuthApi;

  constructor(authApi: IAuthApi) {
    this.auth = authApi;
  }

  public async getProfileData(
    userId?: string,
    role?: Role,
  ): Promise<ProfileResponse | null> {
    if (!userId || !role) {
      console.error("User ID or role is missing. Cannot fetch profile data.");
      return null;
    }

    const requestData: ProfileRequest = {
      userId,
      role,
    };

    const response = await this.auth.getProfile(requestData);

    response.birth_date = new Date(response.birth_date).toLocaleDateString(
      "uk-UA",
    );

    return response;
  }

  public async updateProfile(
    payload: ProfileUpdateRequest,
  ): Promise<ProfileResponse> {
    console.log("Updating profile with payload:", payload);

    const response = await this.auth.updateProfile(payload);
    response.birth_date = new Date(response.birth_date).toLocaleDateString(
      "uk-UA",
    );

    return response;
  }
}

export const userService = new UserService(authApiInstance);
