import { useCallback, useEffect, useState } from "react";
import { groupService } from "../services/groups.services";
import type { GroupData, GroupsRequest } from "../types/groups.types";
import { useAuth } from "../../auth/hooks/useAuth";

export function useGroups() {
  const { user } = useAuth();

  const [groups, setGroups] = useState<GroupData[]>([]);

  const loadGroups = useCallback( async () => {

    if (!user?.id || !user?.role){
        console.error("USE GROUPS:User ID or role is missing. Cannot load groups.");
        return;
    }

    const userData: GroupsRequest = {
        userId: user.id,
        role: user.role,
    };

    const retrievedGroups = await groupService.getGroups(userData);

    setGroups(retrievedGroups);
  }, [user]);

  useEffect(() => {
    void loadGroups();
  }, [loadGroups]);

  return {
    groups,
    loadGroups,
  };
}
