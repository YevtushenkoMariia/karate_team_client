import { getGroup, getGroups, joinGroup } from "../api/groups";
import type { Role } from "../../auth/types/auth.types";
import type { GroupData, GroupsRequest, JoinGroupRequest } from "../types/groups.types";

export class GroupsService {
  public async getGroups(userId?: string, role?: Role): Promise<GroupData[]> {
    if (!userId || !role) {
      console.error("User ID or role is missing. Cannot fetch groups.");
      return [];
    }

    const requestData: GroupsRequest = {
      userId,
      role,
    };

    const response = await getGroups(requestData);
    return response.data ?? [];
  }

  public async getGroup(
    userId: string | undefined,
    groupId: string | number | undefined,
    role?: Role,
  ): Promise<GroupData | null> {
    if (!userId || groupId === undefined || groupId === null || groupId === "") {
      console.error("User ID or group ID is missing. Cannot fetch group.");
      return null;
    }

    const response = await getGroup(userId, groupId, role);
    return response.data ?? null;
  }

  public async joinGroup(
    userId: string | undefined,
    code: string,
  ): Promise<GroupData | null> {
    if (!userId) {
      console.error("User ID is missing. Cannot join group.");
      return null;
    }

    const requestData: JoinGroupRequest = { code };
    const response = await joinGroup(userId, requestData);
    return response.data ?? null;
  }
}


export const groupService = new GroupsService();
