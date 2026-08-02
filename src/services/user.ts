import type { Role } from "../types/auth.types";
import { getProfile, updateProfile } from "../api/profile";
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
    return response.data;
  }

  public async updateProfile(
    payload: ProfileUpdateRequest,
  ): Promise<ProfileUpdateResponse> {
    console.log("Updating profile with payload:", payload);
    return updateProfile(payload);
  }
}

export const userService = new UserService();
