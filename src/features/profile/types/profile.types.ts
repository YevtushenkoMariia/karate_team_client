import { type Role } from "../../auth/types/auth.types";
import { type KarateLevel } from "../../../shared/types/karate_level";

export type ProfileLocation = {
  id: string | number;
  name: string;
};

export type ProfileCoachRef = {
  id: string | number;
  name: string;
  surname: string;
};

export type ProfileRequest = {
  userId: string;
  role: Role;
};

/** Body for PUT /api/user/profile-update — matches server UpdateUserProfileSchema */
export type ProfileUpdateRequest = {
  name?: string;
  surname?: string;
  email?: string;
  gender?: string;
  phone_number?: string;
  birth_date?: string;
  city?: string;
  club?: string;
  karate_level?: string;
  position?: string;
  specialization?: string;
  status?: string;
};

export interface ProfileData {
  id: string | number;
  name: string;
  surname: string;
  role: Role;
  email: string;
  gender: string;
  phone_number: string;
  birth_date: string;
  city: ProfileLocation | null;
}

export type ProfileSportsmanData = Omit<ProfileData, "role"> & {
  role: "SPORTSMAN";
  karate_level: KarateLevel;
  club: ProfileLocation | null;
  status: string;
  coach: ProfileCoachRef | null;
};

export type ProfileCoachData = Omit<ProfileData, "role"> & {
  role: "COACH";
  karate_level: KarateLevel;
  club: ProfileLocation | null;
  position: string;
  specialization: string;
};

export type ProfileUpdateResponse =
  | ProfileSportsmanData
  | ProfileCoachData
  | ProfileData;
