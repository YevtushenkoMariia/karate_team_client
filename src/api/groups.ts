
import type { GroupsRequest, JoinGroupRequest } from "../types/groups.types";
import api from "./axios";

export const getGroups = async (userData: GroupsRequest) => {
     const { userId, ...queryParams } = userData; 

    const response = await api.get(`/api/${userId}/groups`, {
        params: queryParams, 
    });

    return response; 
};

export const getGroup = async (
    userId: string,
    groupId: string | number,
    role?: GroupsRequest["role"],
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
