import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import clsx from "clsx";
import { groupService } from "../services/groups.services";
import type { GroupData } from "../types/groups.types";
import TABS, { type GroupTab } from "../constants/groupsTabs.constants";
import { useAuth } from "../../auth/hooks/useAuth";
import GroupInfoTab from "./groupTabs/groupInfoTab";
import GroupMembersTab from "./groupTabs/groupMembersTab";
import GroupPlansTab from "./groupTabs/groupPlansTab";
import type { GroupRequest } from "../types/groups.types";

const CARD_CLASSNAME =
  "rounded-[20px] border-2 border-(--grey) bg-(--white) shadow-xs";

export default function GroupInfoContent() {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const [group, setGroup] = useState<GroupData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState<GroupTab>("info");

  useEffect(() => {
    const loadGroup = async () => {
      if (!user?.id || !groupId) {
        setIsLoading(false);
        setError("Не вдалося завантажити групу");
        return;
      }

      const userData: GroupRequest = {
        userId: user.id,
        groupId,
        role: user.role
      }

      try {
        const data = await groupService.getGroup(userData);
        setGroup(data);
        if (!data) {
          setError("Групу не знайдено");
        }
      } catch {
        setError("Не вдалося завантажити інформацію про групу");
      } finally {
        setIsLoading(false);
      }
    };

    void loadGroup();
  }, [user?.id, groupId]);

  const pageTitle = group?.name ?? "Група";

  return (
    <div>
      <h1 className="mt-3 font-family-header text-2xl font-bold text-(--black) sm:text-3xl">
        {isLoading ? "Завантаження..." : pageTitle}
      </h1>

      <button
        type="button"
        onClick={() => navigate("/groups")}
        className="inline-flex items-center gap-2 rounded-xl pl-2 pr-4 py-2 
          text-small text-(--dark-grey) transition-colors
          hover:bg-(--hover-nav-bg) hover:text-(--black)"
      >
        <ArrowLeft className="h-4 w-4" />
        До груп
      </button>

      <div className="mt-2 pb-8">
        {isLoading ? (
          <GroupInfoSkeleton />
        ) : !group ? (
          <div className={clsx(CARD_CLASSNAME, "px-5 py-12 text-center")}>
            <p className="font-family-desc text-body text-(--red)">
              {error || "Групу не знайдено"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="-mx-1 overflow-x-auto ">
              <div className="inline-flex w-full ">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={clsx(
                      "px-4 py-2 text-small bg-(--white) whitespace-nowrap transition-colors sm:px-6 border-b-3 border(--white)",
                      activeTab === tab.id
                        ? " font-bold text-(--red) shadow-xs border-(--red) hover:bg-(--light-grey) hover:text-(--middle-red) hover:border-(--middle-red)"
                        : " text-(--dark-grey) hover:bg-(--light-grey) hover:text-(--medium-black) border(--white)",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "info" && <GroupInfoTab group={group} />}

            {activeTab === "plans" && (
              <GroupPlansTab groupId={group.id} />
            )}

            {activeTab === "members" && (
              <GroupMembersTab groupId={group.id} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function GroupInfoSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-11 w-full max-w-[320px] animate-pulse rounded-full bg-(--light-grey)" />
      <div
        className={clsx(
          CARD_CLASSNAME,
          "flex animate-pulse items-center gap-4 p-5 sm:p-6",
        )}
      >
        <div className="h-20 w-20 shrink-0 rounded-full bg-(--light-grey)" />
        <div className="flex flex-col gap-3">
          <div className="h-4 w-40 rounded-full bg-(--light-grey)" />
          <div className="h-4 w-28 rounded-full bg-(--light-grey)" />
        </div>
      </div>
    </div>
  );
}

