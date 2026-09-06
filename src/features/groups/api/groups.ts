
import type { GroupsRequest, JoinGroupRequest } from "../types/groups.types";
import api from "../../../shared/api/axios.api";
import type { Role } from "../../auth/types/auth.types";

export const getGroups = async (userData: GroupsRequest) => {
     const { userId, role } = userData; 

    const response = await api.get(`/api/${userId}/groups`, {
        params: {role}, 
    });

    return response; 
};

export const getGroup = async (
    userId: string,
    groupId: string | number,
    role?:Role,
) => {
    const response = await api.get(`/api/${userId}/groups/${groupId}`, {
        params: role ? { role } : undefined,
    });
    return response;
};

export const joinGroup = async (userId: string, data: JoinGroupRequest) => {
    const response = await api.post(`/api/${userId}/groups/join`, data);
    return response;
};
