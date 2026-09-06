import type {
  GroupData,
  GroupMembersRequest,
  GroupRequest,
  GroupsRequest,
  JoinGroupRequest,
  GroupMember,
} from "../types/groups.types";
import api from "../../../shared/api/axios.api";
import type { IGroupApi } from "./group.interface";
import {type Role} from "../../auth/types/auth.types";

export class GroupsApi implements IGroupApi {
  public async getGroups(userData: GroupsRequest): Promise<GroupData[]> {
    const { userId, role } = userData;

    const response = await api.get(`/api/${userId}/groups`, {
      params: { role },
    });

    console.log("getGroups response:", response);
    return response.data;
  }

  public async getGroup(userData: GroupRequest): Promise<GroupData> {
    const { userId, groupId, role } = userData;
    const response = await api.get(`/api/${userId}/groups/${groupId}`, {
      params: role ? { role } : undefined,
    });

    console.log("getGroup response:", response);
    return response.data;
  }

  public async joinGroup(
    userData: JoinGroupRequest,
  ): Promise<GroupData | null> {
    const { userId, groupCode } = userData;
    const response = await api.post(`/api/${userId}/groups/join`, {
      groupCode,
    });
    console.log("joinGroup response:", response);
    return response.data;
  }

  public async getGroupMembers(
    userData: GroupMembersRequest,
  ): Promise<GroupMember[]> {
    const { userId, groupId } = userData;

    // const response = await api.get(`/api/${userId}/groups/${groupId}/members`);

    const response: GroupMember[] = [
        {
            id: 1,
            name: "John",
            surname: "Doe",
            role: 'ADMIN',
        },
        {
            id: 2,
            name: "Jane",
            surname: "Smith",
            role: 'SPORTSMAN',
        },
        {
            id: 3,
            name: "Alice",
            surname: "Johnson",
            role: 'SPORTSMAN',
        }
    ]

    console.log("getGroupMembers response:", response);
    return response;
  }
}

export const groupApiInstance = new GroupsApi();
