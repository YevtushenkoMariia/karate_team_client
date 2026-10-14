
import { type Role } from "@/shared/types/roles";

export type GroupsRequest = {
  userId: string;
  role: Role;
};

export type GroupRequest = {
  userId: string;
  groupId: string | number;
  role?: Role;
};

export type GroupAuthor = {
  id?: string;
  name: string;
  surname: string;
};

export type GroupData = {
  id: string;
  name: string;
  code: string;
  membersCount: number;
  author: GroupAuthor;
};

export type JoinGroupRequest = {
  userId: string;
  groupCode: string;
};

export type GroupMembersRequest = {
  userId: string;
  groupId: string | number;
};

export type GroupMember = {
  id: string;
  name: string;
  surname: string;
  role: Role;
}
