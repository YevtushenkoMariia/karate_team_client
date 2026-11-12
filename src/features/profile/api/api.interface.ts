
import { type ProfileRequest, type ProfileUpdateRequest } from "../types/profile.types";
import type { ProfileResponse } from "../types/response.type";

export interface IAuthApi {

    getProfile(userData: ProfileRequest): Promise<ProfileResponse>;

    updateProfile(userData: ProfileUpdateRequest): Promise<ProfileResponse>;
}
