import type {
  GroupData,
  GroupMember,
  GroupMembersRequest,
} from "../types/groups.types";
import type {
  GroupsRequest,
  GroupRequest,
  JoinGroupRequest,
} from "../types/groups.types";

export interface IGroupApi {
  getGroups(userData: GroupsRequest): Promise<GroupData[]>;
  getGroup(userdata: GroupRequest): Promise<GroupData | null>;
  joinGroup(userdata: JoinGroupRequest): Promise<GroupData | null>;
  getGroupMembers(userdata: GroupMembersRequest): Promise<GroupMember[]>;
}
