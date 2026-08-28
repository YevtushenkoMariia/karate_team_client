import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Copy, UserRound, Users } from "lucide-react";
import clsx from "clsx";
import { groupService } from "../../services/groups";
import { getStoredUser } from "../../constants/storage";
import { GetDisplayName } from "../../utils/profile";
import { formatMembersCount } from "../../utils/dataFormatter";
import { getAvatarColor } from "../../utils/avatar";
import type { GroupData } from "../../types/groups.types";
import TABS, { type GroupTab } from "../../constants/groups";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { MOBILE_SIZE, TABLET_SIZE } from "../../constants/mediaQuery";

const CARD_CLASSNAME =
  "rounded-[20px] border-2 border-(--grey) bg-(--white) shadow-xs";

export default function GroupInfoContent() {
  const isMobile = useMediaQuery(MOBILE_SIZE);
   const isTablet = useMediaQuery(TABLET_SIZE)


  const { groupId } = useParams();
  const navigate = useNavigate();

  const user = getStoredUser();
  const [group, setGroup] = useState<GroupData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<GroupTab>("info");

  useEffect(() => {
    const loadGroup = async () => {
      if (!user?.id || !groupId) {
        setIsLoading(false);
        setError("Не вдалося завантажити групу");
        return;
      }

      try {
        const data = await groupService.getGroup(user.id, groupId, user.role);
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

  const handleCopyCode = async () => {
    if (!group?.code) return;

    try {
      await navigator.clipboard.writeText(group.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const pageTitle = group?.name ?? "Група";
  const authorName = GetDisplayName(
    group?.author?.name,
    group?.author?.surname,
  );

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

            {activeTab === "info" && (
              <div
                className={clsx(
                  CARD_CLASSNAME,
                  "flex flex-col p-4 sm:flex-row sm:items-center ",
                  " min-w-04",
                  isMobile
                    ? "flex-col items-start gap-4"
                    : "flex-row items-center gap-8",
                )}
              >
                <div
                  className={clsx(
                    "flex h-20 w-20 shrink-0 items-center justify-center",
                    "rounded-full font-family-header text-[28px] text-(--white)",
                    isMobile ? "self-center" : "",
                  )}
                  style={{ backgroundColor: getAvatarColor(group.name) }}
                >
                  {group.name.charAt(0)}
                </div>

                <div className="flex min-w-0 flex-col gap-2">
                  <div className="flex items-center gap-2 text-(--dark-grey)">
                    <UserRound size={16} className="shrink-0" />
                    <span className="truncate text-small">
                      Тренер: {authorName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-(--dark-grey)">
                    <Users size={16} className="shrink-0" />
                    <span className="text-small">
                      {formatMembersCount(group.membersCount ?? 0)}
                    </span>
                  </div>
                </div>

                <div className={clsx("flex min-w-0 flex-col ",
                  isMobile ? "ml-0" :
                  isTablet ? "ml-8" : "ml-10",
                )}>
                  <span className="truncate text-small text-(--dark-grey)">
                    Код групи
                  </span>
                  <div className="inline-flex gap-2 rounded-full px-4 py-1">
                    <span className="text-small-bold tracking-wide text-(--black)">
                      {group.code || "—"}
                    </span>
                    <button
                      type="button"
                      aria-label={copied ? "Скопійовано" : "Копіювати код"}
                      onClick={() => {
                        void handleCopyCode();
                      }}
                      className="rounded-sm p-1 text-(--dark-grey) transition-colors
                        hover:bg-(--grey) hover:text-(--medium-black)"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-(--green)" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

              </div>
            )}

            {activeTab === "plans" && (
              <EmptyTab text="Плани для цієї групи з’являться пізніше" />
            )}

            {activeTab === "members" && (
              <EmptyTab text="Список учасників з’явиться пізніше" />
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

function EmptyTab({ text }: { text: string }) {
  return (
    <div className="rounded-[20px] border-4 border-dashed border-(--light-green) bg-(--white) px-4 py-16">
      <p className="text-center font-family-desc text-sm text-(--dark-grey)">
        {text}
      </p>
    </div>
  );
}
