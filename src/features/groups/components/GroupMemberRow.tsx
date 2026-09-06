import { type GroupMember } from "../types/groups.types";
import clsx from "clsx";
import { UserRound } from "lucide-react";
import { userFormatter } from "../../../shared/utils/profile";

type GroupMemberRowProps = {
  member: GroupMember;
};

export default function GroupMemberRow({ member }: GroupMemberRowProps) {
  const displayName = userFormatter.GetDisplayName(member.name, member.surname);

  return (
    <div
      key={member.id}
      className={clsx(
        "flex items-center gap-2 border-2 border-(--grey)",
        "rounded-[20px] p-4 bg-(-white) shadow-xs transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-(--light-grey) hover:shadow-md active:scale-[0.99]",
        "cursor-pointer w-full",
      )}
    >
      <div
        className={clsx(
          "flex h-16 w-16 shrink-0 items-center justify-center",
          "rounded-full font-family-header text-section-title",
          "text-(--white)",
        )}
        style={{
          backgroundColor: userFormatter.getAvatarColor(displayName),
        }}
      >
        {userFormatter.GetAvatarLetter(member.name, member.surname)}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-small-bold text-(--black)">
          {displayName}
        </span>

        <div className="flex items-center gap-1.5 text-(--dark-grey)">
          <UserRound size={14} className="shrink-0" />

          <span className="text-small">
            {userFormatter.GetRoleLabel(member.role)}
          </span>
        </div>
      </div>
    </div>
  );
}
