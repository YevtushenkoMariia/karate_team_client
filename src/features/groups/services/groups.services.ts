import type {
  GroupData,
  GroupMember,
  GroupMembersRequest,
  GroupRequest,
  GroupsRequest,
  JoinGroupRequest,
} from "../types/groups.types";
import type { IGroupApi } from "./group.interface";
import { groupApiInstance } from "../api/groups";

export class GroupsService {
  private readonly groupsApi: IGroupApi;

  constructor(groupsApi: IGroupApi) {
    this.groupsApi = groupsApi;
  }
  public async getGroups(userData: GroupsRequest): Promise<GroupData[]> {
    const { userId, role } = userData;

    if (!userId || !role) {
      console.error("User ID or role is missing. Cannot fetch groups.");
      return [];
    }

    const requestData: GroupsRequest = {
      userId,
      role,
    };

    const response = await this.groupsApi.getGroups(requestData);
    return response;
  }

  public async getGroup(userData: GroupRequest): Promise<GroupData | null> {
    const { userId, groupId } = userData;

    if (
      !userId ||
      groupId === undefined ||
      groupId === null ||
      groupId === ""
    ) {
      console.error("User ID or group ID is missing. Cannot fetch group.");
      return null;
    }

    const response = await this.groupsApi.getGroup(userData);
    return response;
  }

  public async joinGroup(
    userData: JoinGroupRequest,
  ): Promise<GroupData | null> {
    const { userId, groupCode } = userData;

    if (!userId) {
      console.error("User ID is missing. Cannot join group.");
      return null;
    }

    const requestData: JoinGroupRequest = {
      userId,
      groupCode: groupCode.trim(),
    };
    const response = await this.groupsApi.joinGroup(requestData);
    return response;
  }

  public async getGroupMembers(
    userData: GroupMembersRequest,
  ): Promise<GroupMember[]> {
    const { userId, groupId } = userData;

    if (
      !userId ||
      groupId === undefined ||
      groupId === null ||
      groupId === ""
    ) {
      console.error(
        "User ID or group ID is missing. Cannot fetch group members.",
      );
      return [];
    }

    const response = await this.groupsApi.getGroupMembers(userData);

    return response;
  }
}

export const groupService = new GroupsService(groupApiInstance);
