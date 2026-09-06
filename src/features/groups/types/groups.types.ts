
import { type Role } from "../../auth/types/auth.types";

export type GroupsRequest = {
  userId: string;
  role: Role;
};

export type GroupAuthor = {
  id?: string | number;
  name: string;
  surname: string;
};

export type GroupData = {
  id: number;
  name: string;
  code: string;
  membersCount: number;
  author: GroupAuthor;
};

export type JoinGroupRequest = {
  code: string;
};
