import GroupRow from "./GroupRow";
import { useMediaQuery } from "../../../shared/hooks/useMediaQuery";
import { Plus, UserPlus } from "lucide-react";
import { useState } from "react";
import JoinGroupModal from "./JoinGroupModal";
import { MOBILE_SIZE, TABLET_SIZE } from "../../../shared/constants/mediaQuery";
import { useGroups } from "../hooks/useGroups";
import { useAuth } from "../../auth/hooks/useAuth";

export default function GroupContent() {
  const isMobile = useMediaQuery(MOBILE_SIZE);
  const isTablet = useMediaQuery(TABLET_SIZE);
  const { user } = useAuth();
  const { groups, loadGroups } = useGroups();
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  const canCreateGroup = user?.role === "ADMIN" || user?.role === "COACH";

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

      {groups.length > 0 ? (
        <div
          className={` mx-auto w-full grid gap-4 pb-28
        ${isMobile ? "grid-cols-1 " : isTablet ? "grid-cols-2" : "grid-cols-2"}
      `}
        >
          {groups.map((group) => (
            <GroupRow key={group.id} id={group.id} groupData={group} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8">
          <p className="text-body text-(--dark-grey)">
            У вас ще немає груп. Приєднайтесь до групи за кодом { user?.role != "SPORTSMAN" ? "або створіть нову" : "" }
          </p>
        </div>
      )}

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
