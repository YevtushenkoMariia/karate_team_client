import type { GroupData } from "../../types/groups.types";
import GroupRow from "./GroupRow";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Plus, UserPlus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { groupService } from "../../services/groups";
import { getStoredUser } from "../../constants/storage";
import JoinGroupModal from "./JoinGroupModal";
import { MOBILE_SIZE, TABLET_SIZE } from "../../constants/mediaQuery";

export default function GroupContent() {
  const isMobile = useMediaQuery(MOBILE_SIZE);
  const isTablet = useMediaQuery(TABLET_SIZE);

  const user = getStoredUser();
  const canCreateGroup = user.role === "ADMIN" || user.role === "COACH";

  const [groups, setGroups] = useState<GroupData[]>([]);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  const loadGroups = useCallback(async () => {
    if (!user?.id || !user?.role) {
      return;
    }

    const retrievedGroups = await groupService.getGroups(user.id, user.role);
    setGroups(retrievedGroups);
  }, [user?.id, user?.role]);

  useEffect(() => {
    void loadGroups();
  }, [loadGroups]);

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setIsJoinOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-(--red) px-4 py-2.5
            text-button text-(--white) shadow-xs
            transition hover:bg-(--middle-red)"
        >
          <UserPlus size={18} />
          Приєднатися
        </button>
      </div>

      <div
        className={` mx-auto w-full grid gap-4 pb-28
        ${isMobile ? "grid-cols-1 " : isTablet ? "grid-cols-2" : "grid-cols-2"}
      `}
      >
        {groups.map((group) => (
          <GroupRow key={group.id} id={group.id} groupData={group} />
        ))}
      </div>

      {canCreateGroup && (
        <div className="fixed bottom-8 right-[24px] ">
          <button
            className="flex items-center gap-2 rounded-full
            bg-(--red) px-4 py-4 shadow-xs 
            text-(--white) text-button hover:bg-(--middle-red)"
          >
            <Plus size={20} />
          </button>
        </div>
      )}

      <JoinGroupModal
        open={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        onJoined={() => {
          void loadGroups();
        }}
      />
    </>
  );
}
