import { useState } from "react";
import {
  MOBILE_SIZE,
  TABLET_SIZE,
} from "../../../../shared/constants/mediaQuery";
import { useMediaQuery } from "../../../../shared/hooks/useMediaQuery";
import { formatMembersCount } from "../../../../shared/utils/dataFormatter";
import {  userFormatter } from "../../../../shared/utils/profile";
import type { GroupData } from "../../types/groups.types";
import { Check, Copy, UserRound, Users } from "lucide-react";
import clsx from "clsx";

type GroupInfoTabProps = {
  group: GroupData;
};

export default function GroupInfoTab({ group }: GroupInfoTabProps) {
  const isMobile = useMediaQuery(MOBILE_SIZE);
  const isTablet = useMediaQuery(TABLET_SIZE);

  const authorName = userFormatter.GetDisplayName(
    group?.author?.name,
    group?.author?.surname,
  );

  const [copied, setCopied] = useState(false);

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

  return (
    <div
      className={clsx(
        "rounded-[20px] border-2 border-(--grey) bg-(--white) shadow-xs",
        "flex flex-col p-4 sm:flex-row sm:items-center ",
        " min-w-04",
        isMobile ? "flex-col items-start gap-4" : "flex-row items-center gap-8",
      )}
    >
      <div
        className={clsx(
          "flex h-20 w-20 shrink-0 items-center justify-center",
          "rounded-full font-family-header text-[28px] text-(--white)",
          isMobile ? "self-center" : "",
        )}
        style={{ backgroundColor: userFormatter.getAvatarColor(group.name) }}
      >
        {userFormatter.GetAvatarLetter(group.name, group.author?.surname)}
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex items-center gap-2 text-(--dark-grey)">
          <UserRound size={16} className="shrink-0" />
          <span className="truncate text-small">Тренер: {authorName}</span>
        </div>

        <div className="flex items-center gap-2 text-(--dark-grey)">
          <Users size={16} className="shrink-0" />
          <span className="text-small">
            {formatMembersCount(group.membersCount ?? 0)}
          </span>
        </div>
      </div>

      <div
        className={clsx(
          "flex min-w-0 flex-col ",
          isMobile ? "ml-0" : isTablet ? "ml-8" : "ml-10",
        )}
      >
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
  );
}
