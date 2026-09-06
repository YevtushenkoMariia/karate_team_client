import { useCallback, useEffect, useState } from "react";
import { groupService } from "../services/groups.services";
import type { GroupData } from "../types/groups.types";
import { useAuth } from "../../auth/hooks/useAuth";

export function useGroups() {
  const { user } = useAuth();

  const [groups, setGroups] = useState<GroupData[]>([]);

  const loadGroups = useCallback(async () => {
    if (!user?.id || !user?.role) return;

    const retrievedGroups = await groupService.getGroups(user.id, user.role);

    setGroups(retrievedGroups);
  }, [user?.id, user?.role]);

  useEffect(() => {
    void loadGroups();
  }, [loadGroups]);

  return {
    groups,
    loadGroups,
  };
}
