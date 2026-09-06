import type { Role } from "../../auth/types/auth.types";
import { getProfile, updateProfile } from "../api/profile.api";
import type {
  ProfileRequest,
  ProfileUpdateRequest,
  ProfileUpdateResponse,
} from "../types/profile.types";

export class UserService {
  public async getProfileData(userId?: string, role?: Role) {
    if (!userId || !role) {
      console.error("User ID or role is missing. Cannot fetch profile data.");
      return null;
    }

    const requestData: ProfileRequest = {
      userId,
      role,
    };

    const response = await getProfile(requestData);

    response.data.birth_date = new Date(
      response.data.birth_date,
    ).toLocaleDateString("uk-UA");

    return response.data;
  }

  public async updateProfile(
    payload: ProfileUpdateRequest,
  ): Promise<ProfileUpdateResponse> {
    console.log("Updating profile with payload:", payload);

    const response = await updateProfile(payload);
    response.data.birth_date = new Date(
      response.data.birth_date,
    ).toLocaleDateString("uk-UA");

    return response.data;
  }
}

export const userService = new UserService();
