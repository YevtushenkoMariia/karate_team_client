import { Users, UserRound, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { GroupData } from "../../types/groups.types";
import { getAvatarColor } from "../../utils/avatar";
import { GetDisplayName } from "../../utils/profile";

interface GroupRowProps {
  groupData: GroupData;
  id: number;
}

export default function GroupRow({ groupData }: GroupRowProps) {
  const navigate = useNavigate();
  const authorName = GetDisplayName(groupData.author?.name, groupData.author?.surname);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/groups/${groupData.id}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          navigate(`/groups/${groupData.id}`);
        }
      }}
      className="
      group w-full rounded-[20px]
      border-2 border-(--grey)
      bg-(--white) p-4 shadow-xs
      transition-all duration-200
      hover:-translate-y-0.5
      hover:border-(--light-grey)
      hover:shadow-md
      active:scale-[0.99]
      cursor-pointer
      "
    >
      <div className="flex items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* Avatar */}
          <div
            className="flex h-20 w-20 shrink-0 items-center
            justify-center rounded-full
            font-family-header text-[28px] text-(--white)"
            style={{
              backgroundColor: getAvatarColor(groupData.name),
            }}
          >
            {groupData.name.charAt(0)}
          </div>

          {/* Main info */}
          <div className="min-w-0 text-left">
            <h3
              className="truncate font-family-header text-xl
              font-bold text-(--black)
              "
            >
              {groupData.name}
            </h3>

            <div className="mt-2 flex flex-col gap-y-2 ">
              <div
                className="flex items-center gap-2 text-(--dark-grey)
            "
              >
                <UserRound size={16} />
                <span className="font-family-desc text-sm overflow-hidden">
                  {authorName}
                </span>
              </div>

              <div
                className="flex items-center gap-2 
              text-(--dark-grey)"
              >
                <Users size={16} />
                <span className="font-family-desc text-sm">
                  {groupData.membersCount} members
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex self-start">
          <button
            type="button"
            className="rounded-lg p-2 transition
            hover:bg-(--light-grey)"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
